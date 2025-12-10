import express from "express";
import { body, validationResult } from "express-validator";
import nodemailer from "nodemailer";

const router = express.Router();

// Email transporter configuration
const createTransporter = () => {
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

// Validation rules
const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").optional().trim(),
  body("company").optional().trim(),
  body("service").trim().notEmpty().withMessage("Service is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
];

// POST /api/contact
router.post("/", contactValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, company, service, message } = req.body;

    // In production, you would save this to a database
    // For now, we'll just log it and optionally send an email

    const contactData = {
      name,
      email,
      phone: phone || "Not provided",
      company: company || "Not provided",
      service,
      message,
      timestamp: new Date().toISOString(),
    };

    console.log("New contact form submission:", contactData);

    // Send email if configured
    const transporter = createTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.SMTP_USER,
          subject: `New Contact Form Submission - ${service}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
            <hr>
            <p><small>Submitted at: ${contactData.timestamp}</small></p>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(200).json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      data: {
        id: Date.now(), // In production, use database ID
        ...contactData,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process contact form",
    });
  }
});

// GET /api/contact (for testing)
router.get("/", (req, res) => {
  res.json({
    message: "Contact API endpoint",
    methods: ["POST"],
  });
});

export default router;



