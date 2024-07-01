const mongoose = require("mongoose");
const { DB_URI, PORT } = require("./config");
const app = require("./app");
const { logError } = require("./controller/logs");

// console.log(DB_URI, PORT);

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log("Server is listening on Port", PORT))
  )
  .catch((err) => {
    logError(err);
    console.log(err);
  });
