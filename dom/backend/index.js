const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/sum", (req, res) => {
  const { a, b } = req.query;
  const sum = parseInt(a) + parseInt(b);
  res.send(sum.toString());
});

app.get("/percent", (req, res) => {
  const principal = Number(req.query.principal);
  const rate = Number(req.query.rate);
  const time = Number(req.query.time);
  const interest = ((principal * rate) / 100) * time;
  const total = principal + interest;
  res.json({
    total: total,
    interest: interest,
  });
});

app.listen(3000);
