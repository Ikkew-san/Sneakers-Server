require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const cors = require("cors");
const signup = require("./routes/signup");
const login = require("./routes/login");
const product = require("./routes/product");

const fs = require("fs");
const path = require("path");
const url = require("url");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", signup);
app.use("/api", login);
app.use("/api", product);

// Creating server to accept request
app.use((req, res) => {
  // Parsing the URL
  const request = url.parse(req.url, true);

  // Extracting the path of file
  const action = request.pathname;

  // Path Refinements
  const filePath = path.join(__dirname, action).split("%20").join(" ");

  // Checking if the path exists
  fs.exists(filePath, function (exists) {
    if (!exists) {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.end("404 Not Found");
      return;
    }

    // Reading the file
    fs.readFile(filePath, function (err, content) {
      // Serving the image
      res.end(content);
    });
  });
});

module.exports = app;
