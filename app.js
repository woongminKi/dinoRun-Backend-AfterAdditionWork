require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const index = require("./routes/index");
const login = require("./routes/login");

const app = express();

const corsOptions = {
  origin: process.env.DINORUN_CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/login", login);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

module.exports = app;
