import { describe, it, expect } from "vitest";
import request from "supertest";

// Must be set BEFORE the app (and its contact router) is imported in this
// isolated worker, so use a dynamic import rather than a hoisted static one.
process.env.CONTACT_RATE_LIMIT_MAX = "2";
const { default: app } = await import("../src/app.js");

const validBody = {
  name: "Jane Doe",
  email: "jane@example.com",
  service: "software-digital-products",
  message: "I would like to discuss a project.",
};

describe("POST /api/contact rate limit", () => {
  it("returns 429 after CONTACT_RATE_LIMIT_MAX submissions per hour", async () => {
    const responses = [];
    for (let i = 0; i < 6; i += 1) {
      responses.push(await request(app).post("/api/contact").send(validBody));
    }

    expect(responses[0].status).toBe(200);
    expect(responses[1].status).toBe(200);
    for (const res of responses.slice(2)) {
      expect(res.status).toBe(429);
      expect(res.body.success).toBe(false);
    }
  });
});
