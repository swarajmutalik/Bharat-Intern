const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
const Joi = require("joi");
const { validateRegistration } = require("./schema");

mongoose.connect("mongodb://127.0.0.1:27017/Form", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/register", (req, res) => {
  res.render("Pages/Register");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/register", validateRegistration, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const User = mongoose.model("User", {
      username: String,
      email: String,
      password: String,
    });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.render("home");
  } catch (error) {

    res.render("Partials/error");
  }
});

app.listen(3000, (req, res) => {
  console.log("Serving on port 3000");
});
