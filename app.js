const app = require("express")();

const { PORT = 3000 } = process.env;

app.get("/", (req, res) => {
  res.json({ status: "OK", source: "development" });
});

app.listen(PORT);
