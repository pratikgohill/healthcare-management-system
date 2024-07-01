const fs = require("fs");
const readline = require("readline");
const winston = require("winston");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.File({ filename: "logs/errors.log" })],
});

const logError = (message) => {
  console.log("dsgfdfgdfg");
  logger.error(message);
};

const fetchLogs = async (req, res) => {
  try {
    const logs = [];
    const rl = readline.createInterface({
      input: fs.createReadStream("logs/combined.log"),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      logs.push(line);
    });

    rl.on("close", () => {
      // Send the logs as response
      res.send(logs.join("\n"));
    });
  } catch (err) {
    logError(err);

    res.status(500).json({ error: err.message });
  }
};

const fetchErros = async (req, res) => {
  try {
    const logs = [];
    const rl = readline.createInterface({
      input: fs.createReadStream("logs/errors.log"),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      logs.push(line);
    });

    rl.on("close", () => {
      // Send the logs as response
      res.send(logs.join("\n"));
    });
  } catch (err) {
    logError(err);

    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchLogs, fetchErros, logger, logError };
