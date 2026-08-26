import { NextRequest, NextResponse } from "next/server";
import { config as dotenvConfig } from "dotenv";
import nodemailer from "nodemailer";
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

// Nodemailer requires the Node.js runtime (not Edge).
export const runtime = "nodejs";

// Load the shared .env from the project root, so a single file configures
// the whole site locally. Reads go through a dynamic process.env[key] lookup
// with the parsed file as fallback, because the dev bundler statically
// inlines process.env.X references, hiding runtime mutations. Existing
// process.env values take precedence, so on Vercel (where env vars come from
// the project settings) they apply unchanged.
const fileEnv =
  dotenvConfig({ path: path.resolve(process.cwd(), ".env") }).parsed ?? {};
const env = (key: string): string | undefined =>
  process.env[key] ?? fileEnv[key];

// DATA_DIR can be overridden to relocate the submissions file. On Vercel the
// project filesystem is read-only, so /tmp is used (ephemeral — see the
// best-effort persistence note below).
const DATA_DIR =
  env("DATA_DIR") ||
  (env("VERCEL") ? "/tmp" : path.join(process.cwd(), "data"));
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.jsonl");

// Stable service keys accepted from the frontend, mapped to human-readable
// labels for the email subject line. Keys must stay in sync with
// serviceOptions in src/data/contact.ts.
const SERVICE_LABELS: Record<string, string> = {
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
    greeting: (name: string) => `Hi ${name},`,
    body: "Thank you for reaching out. Your message has been received — we read everything ourselves and will reply to you directly.",
    yourMessage: "Your message:",
    signoff: "— The NeoByte Technology team",
  },
  fr: {
    subject: "Nous avons bien reçu votre message — NeoByte Technology",
    greeting: (name: string) => `Bonjour ${name},`,
    body: "Merci de nous avoir contactés. Votre message a bien été reçu — nous lisons chaque message nous-mêmes et nous vous répondrons directement.",
    yourMessage: "Votre message :",
    signoff: "— L'équipe NeoByte Technology",
  },
};

// Contact form submissions: 5 per hour per IP. CONTACT_RATE_LIMIT_MAX
// overrides the limit. In-memory store: on serverless platforms each
// instance keeps its own counters, so this is best-effort protection.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = Number(env("CONTACT_RATE_LIMIT_MAX")) || 5;
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionsByIp.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  submissionsByIp.set(ip, timestamps);
  return false;
}

// Escape HTML entities before interpolating user input into the email body.
const escapeHtml = (value: string) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Strip CR/LF as defense-in-depth against email header injection.
const sanitizeHeader = (value: string) =>
  String(value).replace(/[\r\n]+/g, " ").trim();

// Email providers, tried in order: Resend (when RESEND_API_KEY is set),
// then generic SMTP (Spaceship or any other provider). The first provider
// that delivers successfully wins; failure only when all of them fail.
const getEmailProviders = () => {
  const providers: { name: string; transporter: nodemailer.Transporter }[] =
    [];

  if (env("RESEND_API_KEY")) {
    providers.push({
      name: "resend",
      transporter: nodemailer.createTransport({
        host: "smtp.resend.com",
        port: 465,
        secure: true,
        auth: { user: "resend", pass: env("RESEND_API_KEY") },
      }),
    });
  }

  const smtpConfigured = Boolean(
    env("SMTP_HOST") && env("SMTP_PORT") && env("SMTP_USER") && env("SMTP_PASS")
  );
  if (smtpConfigured) {
    const port = parseInt(env("SMTP_PORT") as string, 10);
    const secure =
      env("SMTP_SECURE") !== undefined
        ? env("SMTP_SECURE") === "true"
        : port === 465;
    providers.push({
      name: "smtp",
      transporter: nodemailer.createTransport({
        host: env("SMTP_HOST"),
        port,
        secure,
        auth: {
          user: env("SMTP_USER"),
          pass: env("SMTP_PASS"),
        },
      }),
    });
  }

  return providers;
};

interface ContactBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  lang?: unknown;
  website?: unknown;
}

// Validation mirrors the former express-validator rules; errors keep the
// { msg, param } shape the frontend already understands.
function validate(body: ContactBody) {
  const errors: { msg: string; param: string }[] = [];

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) errors.push({ msg: "Name is required", param: "name" });
  else if (name.length > 100)
    errors.push({ msg: "Name must be at most 100 characters", param: "name" });

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    errors.push({ msg: "Valid email is required", param: "email" });
  else if (email.length > 254)
    errors.push({
      msg: "Email must be at most 254 characters",
      param: "email",
    });

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (phone.length > 30)
    errors.push({ msg: "Phone must be at most 30 characters", param: "phone" });

  const company =
    typeof body.company === "string" ? body.company.trim() : "";
  if (company.length > 100)
    errors.push({
      msg: "Company must be at most 100 characters",
      param: "company",
    });

  const service = typeof body.service === "string" ? body.service.trim() : "";
  if (!Object.keys(SERVICE_LABELS).includes(service))
    errors.push({ msg: "Invalid service", param: "service" });

  const message =
    typeof body.message === "string" ? body.message.trim() : "";
  if (!message) errors.push({ msg: "Message is required", param: "message" });
  else if (message.length > 5000)
    errors.push({
      msg: "Message must be at most 5000 characters",
      param: "message",
    });

  const lang: "en" | "fr" = body.lang === "fr" ? "fr" : "en";

  return {
    errors,
    data: { name, email, phone, company, service, message, lang },
  };
}

const successEnvelope = (extra: Record<string, unknown> = {}) => ({
  success: true,
  message: "Thank you for your message! We'll get back to you soon.",
  ...extra,
});

// POST /api/contact
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many submissions from this IP, please try again later.",
      },
      { status: 429 }
    );
  }

  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { errors, data } = validate(body);
  if (errors.length > 0) {
    return NextResponse.json(
      { success: false, errors },
      { status: 400 }
    );
  }

  // Honeypot: a filled "website" field means a bot. Mimic success but do
  // not persist or send email.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    console.log("Contact form honeypot triggered; submission dropped.");
    return NextResponse.json(successEnvelope());
  }

  const { name, email, phone, company, service, message, lang } = data;
  const receivedAt = new Date().toISOString();

  // Best-effort persistence. On serverless platforms (Vercel) the filesystem
  // is ephemeral, so the notification email below is the durable channel;
  // a write failure must not lose the lead or fail the request.
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(
      SUBMISSIONS_FILE,
      JSON.stringify({
        name,
        email,
        phone,
        company,
        service,
        message,
        receivedAt,
      }) + "\n",
      "utf8"
    );
  } catch (persistError) {
    console.warn("Failed to persist contact submission:", persistError);
  }

  // One-line log without message content or extra PII.
  console.log(`New contact submission: ${name} <${email}> - ${service}`);

  const providers = getEmailProviders();
  if (providers.length === 0) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { success: false, error: "Email service is not configured" },
        { status: 502 }
      );
    }
    console.warn(
      "No email provider configured - submission accepted without sending email."
    );
    return NextResponse.json(successEnvelope({ note: "email-not-configured" }));
  }

  const serviceLabel = SERVICE_LABELS[service];
  const display = (value: string) => escapeHtml(value || "Not provided");
  const mailOptions = {
    from:
      env("SMTP_FROM") || env("CONTACT_EMAIL") || env("SMTP_USER"),
    to: env("CONTACT_EMAIL") || env("SMTP_USER"),
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
      `Submitted at: ${receivedAt}`,
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
      <p><small>Submitted at: ${receivedAt}</small></p>
    `,
  };

  for (const provider of providers) {
    try {
      await provider.transporter.sendMail(mailOptions);
      console.log(`Contact notification sent via ${provider.name}.`);

      // Auto-confirmation to the visitor. Best-effort: a failure here must
      // not fail the request — the team notification already succeeded.
      const copy = CONFIRMATION_COPY[lang];
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
          (confirmError as Error).message
        );
      }

      return NextResponse.json(successEnvelope());
    } catch (emailError) {
      console.error(
        `Email sending failed via ${provider.name}:`,
        (emailError as Error).message
      );
    }
  }

  // All providers failed.
  return NextResponse.json(
    {
      success: false,
      error:
        "Your message was received, but the notification email could not be sent. Please try again later.",
    },
    { status: 502 }
  );
}
