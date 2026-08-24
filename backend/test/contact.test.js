import { describe, it, expect } from "vitest";
import { readFile } from "node:fs/promises";
import path from "node:path";
import request from "supertest";
import app from "../src/app.js";

const submissionsFile = path.join(process.env.DATA_DIR, "submissions.jsonl");

const validBody = {
  name: "Jane Doe",
  email: "jane@example.com",
  service: "software-digital-products",
  message: "I would like to discuss a project.",
};

const readLines = async () => {
  try {
    const content = await readFile(submissionsFile, "utf8");
    return content.trim().split("\n").filter(Boolean);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
};

describe("POST /api/contact", () => {
  it("accepts a valid submission in dev mode and persists it", async () => {
    const before = await readLines();

    const res = await request(app).post("/api/contact").send(validBody);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.note).toBe("email-not-configured");

    const after = await readLines();
    expect(after.length).toBe(before.length + 1);
    const saved = JSON.parse(after[after.length - 1]);
    expect(saved.email).toBe(validBody.email);
    expect(saved.service).toBe(validBody.service);
  });

  it("rejects a missing name with 400", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, name: "" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("rejects a missing message with 400", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, message: "" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("rejects an invalid email with 400", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, email: "not-an-email" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("rejects a service outside the allowlist with 400", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, service: 'web-development"><script>' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("rejects a name longer than 100 characters with 400", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, name: "a".repeat(101) });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("rejects a message longer than 5000 characters with 400", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, message: "a".repeat(5001) });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("mimics success for honeypot submissions without persisting", async () => {
    const before = await readLines();

    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, website: "https://spam.example" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const after = await readLines();
    expect(after.length).toBe(before.length);
  });

  it("answers malformed JSON with 400 and no stack trace", async () => {
    const res = await request(app)
      .post("/api/contact")
      .set("Content-Type", "application/json")
      .send("{ not valid json");

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(JSON.stringify(res.body)).not.toContain("stack");
  });
});

describe("removed and misc routes", () => {
  it("GET /api/contact returns 404", async () => {
    const res = await request(app).get("/api/contact");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Route not found");
  });

  it("GET /nonexistent returns 404", async () => {
    const res = await request(app).get("/nonexistent");
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Route not found");
  });

  it("GET /health returns 200 with status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
