// Requiring modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Creating server to accept request
http
  .createServer((req, res) => {
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

      // Extracting file extension
      const ext = path.extname(action);

      // Setting default Content-Type
      const contentType = "text/plain";

      // Checking if the extension of
      // image is '.png'
      if (ext === ".png") {
        contentType = "image/png";
      }

      // Setting the headers
      res.writeHead(200, {
        "Content-Type": contentType,
      });

      // Reading the file
      fs.readFile(filePath, function (err, content) {
        // Serving the image
        res.end(content);
      });
    });
  })

  // Listening to the PORT: 3000
  .listen(3000, "127.0.0.1");
