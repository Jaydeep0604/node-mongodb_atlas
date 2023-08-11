const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();

const User= require('./model/user_model');

// app.use(bodyParser.json());
dotenv.config({ path: "./config.env" });
require("./db/coon");
app.use(express.json());
app.use(require("./router/auth"));
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});