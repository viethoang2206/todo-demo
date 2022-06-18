const express = require("express");
const authenticatToken = require("../helper/jwt.helper");
const {
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,

  updateStatus,
} = require("../controllers/todoControllers");
const {
  authenticateToken,
  verifyTodo,
  verifyUser,
} = require("../helper/jwt.helper");

const router = express.Router();

router.get("/:id", getTodo);
router.delete("/:id", verifyTodo, deleteTodo);

router.patch("/:id", verifyTodo, updateTodo);

router.post("/", verifyUser, createTodo);
router.patch("/:status/:id", verifyTodo, updateStatus);
module.exports = router;
