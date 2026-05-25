// logger.js
const fs = require("fs");
const path = require("path");

class Logger {
  static instance;
  

  constructor() {
    // Prevent multiple instances
    if (Logger.instance) {
      return Logger.instance;
    }

    this.logFilePath = path.join(__dirname, "app.log");

    Logger.instance = this;
  }

  write(level, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    // Write to console
    console.log(logMessage);

    // Write to file
    fs.appendFileSync(this.logFilePath, logMessage + "\n", "utf8");
  }

  info(message) {
    this.write("info", message);
  }

  warn(message) {
    this.write("warn", message);
  }

  error(message) {
    this.write("error", message);
  }
}

// Export single instance
const logger = new Logger();
Object.freeze(logger);

module.exports = logger;