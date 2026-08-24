import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll } from "vitest";

// Each test file (isolated worker) gets a fresh temp DATA_DIR so runs are
// hermetic and never touch the real data/ directory.
const dataDir = mkdtempSync(path.join(tmpdir(), "neobyte-test-"));

process.env.NODE_ENV = "development";
process.env.DATA_DIR = dataDir;
// High limit so validation tests are not throttled. The rate-limit test file
// overrides this before importing the app.
process.env.CONTACT_RATE_LIMIT_MAX = "100";
// Blank out SMTP config so a local .env cannot leak credentials into tests
// (dotenv does not override variables that are already set, and an empty
// string fails the isSmtpConfigured() check).
process.env.SMTP_HOST = "";
process.env.SMTP_PORT = "";
process.env.SMTP_USER = "";
process.env.SMTP_PASS = "";

afterAll(() => {
  rmSync(dataDir, { recursive: true, force: true });
});
