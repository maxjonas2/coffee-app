const http = require("http");
const express = require("express");
const coffeeStores = require("./data/coffee-stores");
const app = express();
const cluster = require("cluster");
const { runIntensiveProcess } = require("./utils");

const PORT = 8000;

app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/shops", (req, res) => {
  res.setHeader("Cache-Control", "max-age=3600");
  res.status(200).json(coffeeStores);
});

app.get("/api/shops/:id", (req, res) => {
  const params = req.params;
  if (!Number(params.id) || Number(params.id) > 10000) {
    return res
      .status(500)
      .json({ status: "error", message: "No valid ID provided" });
  }
  const coffeeStoreData = coffeeStores.find((item) => item.id == params.id);
  if (coffeeStoreData) {
    res.status(200).json(coffeeStoreData);
  } else {
    res.status(404).json({ error: "Resource not found" });
  }
});

app.get("/api/runIntensiveProcess", runIntensiveProcess);

http.createServer(app).listen(PORT, "localhost", () => {
  console.log("listening on port " + PORT);
});

// **REMINDER: REFACTOR THIS AS A GOOGLE CLOUD FUNCTION
