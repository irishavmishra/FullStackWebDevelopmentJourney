const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  const user = ALL_USERS.find(
    (user) => user.username === username && user.password === password
  );
  return user !== undefined;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const verifyed = jwt.verify(token, jwtPassword);
    const username = verifyed.username;
    // return a list of users other than this username

    const FILTER_USERS = ALL_USERS.filter((user) => user.username === username);
    res.json({
      users: FILTER_USERS,
    });
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token Hello",
    });
  }
});

app.listen(3000);
