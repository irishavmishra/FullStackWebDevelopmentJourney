// npm i express mongodb zod jsonwebtoken
const express = require("express");
const mongoose = require("mongoose");
const z = require("zod");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://onlyrishavmishra:NJT6sTNVnjtsd60h@cluster0.sqgj9b8.mongodb.net/signup"
);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Define the Mongoose model
const User = mongoose.model("Users", {
  name: String,
  username: String,
  email: String,
  password: String,
});

// Define the Zod schema for user signup
const schema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

app.post("/signUp", async (req, res) => {
  //  if we dont use zod then we can use this express parser json to string
  //   const name = req.body.name;
  //   const username = req.body.username;
  //   const email = req.body.email;
  //   const password = req.body.password;

  // Validate the request body using Zod schema and assign value
  const validation = schema.safeParse(req.body);
  const { name, username, email, password } = validation.data;

  // check Database before saving data (username or email uniqu or not)
  const existingUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (existingUser) {
    return res.status(400).send("User Name or email already exist");
  }

  //   using Jwt to create token
  const token = jwt.sign({ username: username }, jwtPassword);

  const user = new User({
    name: name,
    username: username,
    email: email,
    password: password,
  });

  await user.save();

  res.json({
    msg: "User Created Successfully",
    token: token,
  });
});

app.get("/", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    const user = await User.findOne({ username: username });
    if (!user) {
      // If user not found, return a 404 status
      return res.status(404).json({
        msg: "User not found",
      });
    }
    // Find all users in the database
    const users = await User.find();
    res.json({
      user: users,
      msg: "You sucessfully send jwt token and you get data after verify user",
    });
  } catch {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
