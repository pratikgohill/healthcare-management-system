const express = require("express");
const cors = require("cors");
const winston = require("winston");
const expressWinston = require("express-winston");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const medicalDataRoutes = require("./routes/medicalData");
const patientRoutes = require("./routes/patients");
const logsRoute = require("./routes/logs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.File({ filename: "logs/combined.log" }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

// app.use(
//   expressWinston.errorLogger({
//     transports: [new winston.transports.File({ filename: "logs/errors.log" })],
//     format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//     ),
//   })
// );

app.use("/api/auth", authRoutes);
app.use("/api/medicalData", medicalDataRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/logs", logsRoute);

module.exports = app;
