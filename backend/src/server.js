import app, { validateEnv } from "./app.js";

validateEnv();

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(`${signal} received, shutting down...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
};
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
  process.exit(1);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});
