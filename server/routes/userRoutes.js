const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../helper/jwt.helper");
const User = require("../model/user");
const {
  findUser,
  registerUser,
  checkUser,
} = require("../controllers/userControllers");

const router = express.Router();
router.post("/login", findUser);
router.post("/createUser", checkUser, registerUser);
module.exports = router;
