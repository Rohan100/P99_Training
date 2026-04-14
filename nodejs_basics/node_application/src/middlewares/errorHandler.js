/**
 * Global Express error-handler middleware.
 *
 * Must be registered LAST in app.js (after all routes).
 * Express identifies it as an error handler because it accepts
 * exactly four parameters: (err, req, res, next).
 */

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  // ── Defaults ────────────────────────────────────────────────────────────────
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  console.log(err, "Error From middleware")
  // ── Handle specific error types ──────────────────────────────────────────────

  // PostgreSQL unique-constraint violation  (e.g. duplicate email)
  if (err.code === '23505') {
    statusCode = 409;
    message = 'A record with that value already exists.';
  }

  // PostgreSQL foreign-key violation
  if (err.code === '23503') {
    statusCode = 400;
    message = 'Referenced record does not exist.';
  }

  // JSON syntax error in request body (thrown by express.json())
  if (err.type === 'entity.parse.failed') {
    statusCode = 400;
    message = 'Invalid JSON in request body.';
  }

  // ── Log the error (skip 4xx in production to reduce noise) ──────────────────
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction || statusCode >= 500) {
    console.error(`[${new Date().toISOString()}] ${statusCode} — ${message}`);
    if (statusCode >= 500) console.error(err.stack);
  }

  // ── Send response ────────────────────────────────────────────────────────────
  const response = {
    success: false,
    message,
  };

  // Expose the stack trace only in development
  if (!isProduction && statusCode >= 500) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
