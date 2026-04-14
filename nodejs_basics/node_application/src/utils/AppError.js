/**
 * Custom operational error class.
 *
 * Throw this anywhere in the application when you want the global
 * error-handler middleware to send a specific HTTP status code and
 * message back to the client.
 *
 * @example
 *   throw new AppError('Student not found', 404);
 */
class AppError extends Error {
  /**
   * @param {string} message  - Human-readable error description.
   * @param {number} statusCode - HTTP status code (4xx / 5xx).
   */
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    // 4xx errors are "operational" (expected); 5xx are programming bugs
    this.isOperational = statusCode < 500;

    // Capture V8 stack trace, excluding this constructor frame
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
