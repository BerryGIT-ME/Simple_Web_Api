import winston from "winston";

const logFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  }
);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  //defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
