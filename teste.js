import http from "http";
import express from "express";
import path, { dirname } from "path";
import { env } from "process";

const app = express();

app.use(express.static("public"));

app.get("/teste", (req, res) => {
  // res.setHeader("Content-Type", "text/html");
  res.status(200).sendFile(path.join(__dirname, "public", "random.html"));
});

http.createServer(app).listen(8000, "localhost");

if (2 - 2 === 4) {
  import("http").then((http) => {
    const server = http.createServer((req, res) => {
      if (req.url.includes("teste")) {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        setTimeout(() => {
          res.end(JSON.stringify({ status: "success" }));
        }, 1000);
      } else {
        res.end("oops");
      }
    });
    server.listen(8000, "localhost", function () {
      console.log("listening");
    });
  });
} else {
  console.log("no import needed");
}
