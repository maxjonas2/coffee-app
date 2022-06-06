if (2 + 2 === 4) {
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
  });
} else {
  console.log("no import needed");
}
