import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.js";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

// Validate environment on boot. Production fails fast on missing config so
// misconfigured deploys never start serving traffic. Called from server.js
// only, so importing this module (e.g. in tests) never exits the process.
export function validateEnv() {
  const errors = [];

  const port = process.env.PORT;
  if (
    port !== undefined &&
    (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535)
  ) {
    errors.push(`PORT must be a number between 1 and 65535 (got "${port}")`);
  }

  const smtpPort = process.env.SMTP_PORT;
  if (smtpPort !== undefined && !/^\d+$/.test(smtpPort)) {
    errors.push(`SMTP_PORT must be numeric (got "${smtpPort}")`);
  }

  if (isProduction) {
    if (!process.env.FRONTEND_URL) {
      errors.push("Missing required environment variable: FRONTEND_URL");
    }
    // At least one email provider must be configured: Resend (API key) or a
    // complete generic SMTP configuration.
    const hasResend = Boolean(process.env.RESEND_API_KEY);
    const hasSmtp = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"].every(
      (key) => process.env[key]
    );
    if (!hasResend && !hasSmtp) {
      errors.push(
        "Missing email configuration: set RESEND_API_KEY, or SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS"
      );
    }
  }

  if (errors.length > 0) {
    console.error("Invalid environment configuration:");
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }
}

const app = express();

// The frontend reaches this API through the Next.js server-side proxy, which
// forwards X-Forwarded-For. Trust the first proxy hop so per-IP rate limits
// apply to real visitors instead of the proxy's shared address.
app.set("trust proxy", 1);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Lenient global limiter: 100 requests per 15 minutes per IP.
// The contact form has a stricter limiter of its own.
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: "Too many requests, please try again later.",
    });
  },
});

// Middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(globalLimiter);
app.use(
  cors({
    origin: FRONTEND_URL,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/contact", contactRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  // Body-parser errors (malformed JSON, payload too large) carry a 4xx
  // status — answer cleanly instead of leaking a stack trace.
  if (err.status && err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({
      success: false,
      error: "Invalid request body",
    });
  }
  console.error(err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
