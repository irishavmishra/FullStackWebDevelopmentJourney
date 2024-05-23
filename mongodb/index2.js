const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://onlyrishavmishra:NJT6sTNVnjtsd60h@cluster0.sqgj9b8.mongodb.net/userapps"
);

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const User = mongoose.model("users", {
  name: String,
  username: String,
  email: String,
  password: String,
});

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (existingUser) {
    return res.status(400).send("Username already exists");
  }

  const user = new User({
    name: name,
    username: username,
    email: email,
    password: password,
  });
  await user.save();
  res.send({
    msg: "User Created Sucessfully",
  });
});

app.listen(port, () => console.log(`Listening on post ${port}`));
