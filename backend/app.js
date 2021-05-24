//Import
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post.js");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const path = require("path");

//création app express
const app = express();

//Résolution erreur CORS
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(limiter);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
