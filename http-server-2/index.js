const express = require("express");
const data = require("./data.json");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/conversation", (req, res) => {
  console.log(req.body);

  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
