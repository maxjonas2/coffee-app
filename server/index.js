const http = require("http");
const express = require("express");
const path = require("path");
const coffeeStores = require("./data/coffee-stores");

const app = express();

app.use(express.static("public"));

app.get("/api/shops", (req, res) => {
  res.header("Cache-Control", "max-age=3600");
  res.status(200).json(coffeeStores);
});

app.get("/api/shops/:id", (req, res) => {
  const { id } = req.params;
  if (!Number(id) || Number(id) > 10000) {
    return res
      .status(500)
      .json({ status: "error", message: "No valid ID provided" });
  }
  res.status(200).json([{ id, name: "teste", address: "Route 303" }]);
});

http.createServer(app).listen("8000", "localhost", () => {
  console.log("listening");
});
