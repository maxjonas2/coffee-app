const runIntensiveProcess = (req, res) => {
  let i = 0;
  let x;
  let now = Date.now();
  while (Date.now() - now < 15 * 1000) {
    i++;
    x = i + 1.23e9;
  }
  let str =
    x <= Number.MAX_SAFE_INTEGER
      ? "X smaller than safe integer."
      : "X exceeds safe integer.";
  return res.end(
    "Hello world. Number of iterations: " + i + ". X equals " + x + ". " + str
  );
};

module.exports = { runIntensiveProcess };
