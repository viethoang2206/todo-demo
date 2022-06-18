require("dotenv").config();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const brcypt = require("bcrypt");

exports.getUser = async (req, res) => {
  const { id } = req.id;
  const user = await User.find({ _id: id }).catch((err) => {
    res.status(404).json({
      success: false,
      message: "cant find user",
    });
  });

  res.json({ success: true, user });
};

exports.findUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({ username });
  if (user.length === 0) {
    res.status(404).json({
      success: false,
      message: "cant find user",
    });
  } else {
    brcypt.compare(password, user[0].password, (err, matches) => {
      if (err) {
        console.log("Error while checking password");
      } else if (matches) {
        const id = user[0]._id;

        const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
        // , {
        //   expiresIn: 300,
        // }

        res.json({
          token,
          success: true,
          userID: user[0]._id,
        });
      } else {
        res.json({
          success: false,
          message: "Wrong password or username",
        });
      }
    });
  }
};

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const salt = await brcypt.genSalt(10);
  const hashed = await brcypt.hash(password, salt);
  console.log(hashed);
  const data = await User.create({
    username,
    password: hashed,
  }).catch((err) => {
    const errors = err.errors;
    const keys = Object.keys(errors);
    const errorObj = {};
    keys.map((key) => {
      errorObj[key] = errors[key].message;
    });
  });

  res.status(201).json({
    data,
    success: true,
  });
};
exports.checkUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.find({ username });

  if (user[0]) {
    res.json({
      success: false,
      message: "Username already exist",
    });
  } else {
    next();
  }
};
