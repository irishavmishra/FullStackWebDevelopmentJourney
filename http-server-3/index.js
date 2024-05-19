const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const users = [
  {
    name: "Jons",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.get("/", (req, res) => {
  const JonsKidneys = users[0].kidneys;
  const numberOfKidneys = JonsKidneys.length;
  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < numberOfKidneys; i++) {
    if (JonsKidneys[i].healthy) {
      numberOfHealthyKidneys += 1;
    }
  }
  const numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnHealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.send({
    msg: "Done!",
  });
});

app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.send({
    msg: "Done!",
  });
});

app.delete("/", (req, res) => {
  if (isThereAtleastOneUnhealthy()) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy === false) {
        users[0].kidneys.splice(i, 1);
        i--;
      }
    }
    res.send({
      msg: "Done!",
    });
  } else {
    res.sendStatus(411);
  }
});

function isThereAtleastOneUnhealthy() {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      return true;
    }
  }
  return false;
}

app.listen(port, () => {
  console.log(`this is listning on port ${port}`);
});
