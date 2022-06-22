const User = require("../model/user");
const Todo = require("../model/todo");
const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      success: false,
      message: "Access token not found",
    });
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
      if (err) return res.status(403);
      req.id = id;

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(403);
  }
};
const verifyUser = async (req, res, next) => {
  const userID = await User.find({ _id: req.body.ownerID });

  authenticateToken(req, res, () => {
    if (userID && req.id.id == userID[0]._id) {
      next();
    } else {
      res.status(403).json("you are not allowed to do this");
    }
  });
};
const verifyTodo = async (req, res, next) => {
  const checkTodoId = await Todo.find({ _id: req.params.id });
  authenticateToken(req, res, () => {
    console.log(req.id);
    if (req.id.id == checkTodoId[0].ownerID) {
      next();
    } else {
      res.status(403).json("you are not allowed to do this");
    }
  });
};

module.exports = { authenticateToken, verifyTodo, verifyUser };
