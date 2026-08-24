import express from "express";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const router = express.Router();

// DATA_DIR can be overridden (e.g. by tests) to relocate the submissions file.
const DATA_DIR =
  process.env.DATA_DIR ||
  path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.jsonl");

// Stable service keys accepted from the frontend, mapped to human-readable
// labels for the email subject line.
const SERVICE_LABELS = {
  "ai-intelligent-systems": "AI & Intelligent Systems",
  "software-digital-products": "Software & Digital Products",
  "cloud-infrastructure": "Cloud & Infrastructure",
  "digital-commerce": "Digital Commerce",
  other: "Other",
};

// Auto-confirmation sent to the visitor after a successful submission,
// in the language they used on the site.
const CONFIRMATION_COPY = {
  en: {
    subject: "We received your message — NeoByte Technology",
    greeting: (name) => `Hi ${name},`,
    body: "Thank you for reaching out. Your message has been received — we read everything ourselves and will reply to you directly.",
    yourMessage: "Your message:",
    signoff: "— The NeoByte Technology team",
  },
  fr: {
    subject: "Nous avons bien reçu votre message — NeoByte Technology",
    greeting: (name) => `Bonjour ${name},`,
    body: "Merci de nous avoir contactés. Votre message a bien été reçu — nous lisons chaque message nous-mêmes et nous vous répondrons directement.",
    yourMessage: "Votre message :",
    signoff: "— L'équipe NeoByte Technology",
  },
};

// Contact form submissions: 5 per hour per IP. CONTACT_RATE_LIMIT_MAX
// overrides the limit (used by tests; not intended for production tuning).
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: "Too many submissions from this IP, please try again later.",
    });
  },
});

// Escape HTML entities before interpolating user input into the email body.
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Strip CR/LF as defense-in-depth against email header injection.
const sanitizeHeader = (value) => String(value).replace(/[\r\n]+/g, " ").trim();

// Email providers, tried in order: Resend (when RESEND_API_KEY is set),
// then generic SMTP (Spaceship or any other provider). The first provider
// that delivers successfully wins; failure only when all of them fail.
const getEmailProviders = () => {
  const providers = [];

  if (process.env.RESEND_API_KEY) {
    providers.push({
      name: "resend",
      transporter: nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 465,
        secure: true,
        auth: { user: "resend", pass: process.env.RESEND_API_KEY },
      }),
    });
  }

  const smtpConfigured = Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
  if (smtpConfigured) {
    const port = parseInt(process.env.SMTP_PORT, 10);
    const secure =
      process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === "true"
        : port === 465;
    providers.push({
      name: "smtp",
      transporter: nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }),
    });
  }

  return providers;
};

// Validation rules
const contactValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .isLength({ max: 254 })
    .withMessage("Email must be at most 254 characters")
    .normalizeEmail(),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 30 })
    .withMessage("Phone must be at most 30 characters"),
  body("company")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company must be at most 100 characters"),
  body("service")
    .trim()
    .isIn(Object.keys(SERVICE_LABELS))
    .withMessage("Invalid service"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 5000 })
    .withMessage("Message must be at most 5000 characters"),
  body("lang").optional().isIn(["en", "fr"]).withMessage("Invalid language"),
];

const successEnvelope = (extra = {}) => ({
  success: true,
  message: "Thank you for your message! We'll get back to you soon.",
  ...extra,
});

// POST /api/contact
router.post("/", contactLimiter, contactValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  // Honeypot: a filled "website" field means a bot. Mimic success but do
  // not persist or send email.
  if (typeof req.body.website === "string" && req.body.website.trim() !== "") {
    console.log("Contact form honeypot triggered; submission dropped.");
    return res.status(200).json(successEnvelope());
  }

  const { name, email, phone, company, service, message, lang } = req.body;

  const submission = {
    name,
    email,
    phone: phone || "",
    company: company || "",
    service,
    message,
    receivedAt: new Date().toISOString(),
  };

  // Persist BEFORE attempting email send, so leads are never lost.
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(
      SUBMISSIONS_FILE,
      JSON.stringify(submission) + "\n",
      "utf8"
    );
  } catch (persistError) {
    console.error("Failed to persist contact submission:", persistError);
    return res.status(500).json({
      success: false,
      error: "Failed to process contact form",
    });
  }

  // One-line log without message content or extra PII.
  console.log(`New contact submission: ${name} <${email}> - ${service}`);

  const providers = getEmailProviders();
  if (providers.length === 0) {
    if (process.env.NODE_ENV === "production") {
      // Unreachable in practice: server.js fails fast at boot when no email
      // provider is configured in production.
      return res.status(502).json({
        success: false,
        error: "Email service is not configured",
      });
    }
    console.warn(
      "No email provider configured - submission persisted without sending email."
    );
    return res
      .status(200)
      .json(successEnvelope({ note: "email-not-configured" }));
  }

  const serviceLabel = SERVICE_LABELS[service];
  const display = (value) => escapeHtml(value || "Not provided");
  const mailOptions = {
    from:
      process.env.SMTP_FROM ||
      process.env.CONTACT_EMAIL ||
      process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    // Replies to the notification go straight to the visitor, not to us.
    replyTo: sanitizeHeader(`${name} <${email}>`),
    subject: sanitizeHeader(`New Contact Form Submission - ${serviceLabel}`),
    text: [
      "New Contact Form Submission",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Company: ${company || "Not provided"}`,
      `Service: ${serviceLabel}`,
      "",
      "Message:",
      message,
      "",
      `Submitted at: ${submission.receivedAt}`,
    ].join("\n"),
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${display(phone)}</p>
      <p><strong>Company:</strong> ${display(company)}</p>
      <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      <hr>
      <p><small>Submitted at: ${submission.receivedAt}</small></p>
    `,
  };

  for (const provider of providers) {
    try {
      await provider.transporter.sendMail(mailOptions);
      console.log(`Contact notification sent via ${provider.name}.`);

      // Auto-confirmation to the visitor. Best-effort: a failure here must
      // not fail the request — the team notification already succeeded.
      const copy = CONFIRMATION_COPY[lang === "fr" ? "fr" : "en"];
      try {
        await provider.transporter.sendMail({
          from: mailOptions.from,
          to: email,
          subject: sanitizeHeader(copy.subject),
          text: [
            copy.greeting(name),
            "",
            copy.body,
            "",
            copy.yourMessage,
            message,
            "",
            copy.signoff,
          ].join("\n"),
          html: `
            <p>${escapeHtml(copy.greeting(name))}</p>
            <p>${escapeHtml(copy.body)}</p>
            <p><strong>${escapeHtml(copy.yourMessage)}</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            <p>${escapeHtml(copy.signoff)}</p>
          `,
        });
        console.log(`Confirmation sent to visitor via ${provider.name}.`);
      } catch (confirmError) {
        console.error(
          `Confirmation email failed via ${provider.name}:`,
          confirmError.message
        );
      }

      return res.status(200).json(successEnvelope());
    } catch (emailError) {
      console.error(
        `Email sending failed via ${provider.name}:`,
        emailError.message
      );
    }
  }

  // All providers failed. The submission is already persisted, so the lead
  // is safe.
  return res.status(502).json({
    success: false,
    error:
      "Your message was received, but the notification email could not be sent. Please try again later.",
  });
});

export default router;
