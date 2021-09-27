const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./errorHandler");
require("dotenv").config();
const formRouter = require("./routes/formRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/form", formRouter);

app.use((req, res, next) => {
  const error = new Error("Route doesn't exists!");
  error.status = 404;
  next(error);
});

app.use(errorHandler);

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
