const http = require("http");
const express = require("express");
const path = require("path");
const coffeeStores = require("./data/coffee-stores");
const axios = require("axios").default;
const app = express();

app.use(express.static("public"));

app.get("/api/shops", (req, res) => {
  res.header("Cache-Control", "max-age=3600");
  res.status(200).json(coffeeStores);
});

app.get("/api/shops/:id", (req, res) => {
  const params = req.params;
  if (!Number(params.id) || Number(params.id) > 10000) {
    return res
      .status(500)
      .json({ status: "error", message: "No valid ID provided" });
  }
  res.status(200).json(coffeeStores.find((item) => item.id == params.id));
});



http.createServer(app).listen("8000", "localhost", () => {
  console.log("listening");
});

// **REMINDER: REFACTOR THIS AS A GOOGLE CLOUD FUNCTION
