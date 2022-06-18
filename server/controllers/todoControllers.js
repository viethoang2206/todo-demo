const Todo = require("../model/todo");

exports.getTodo = async (req, res) => {
  const { id } = req.params;

  const data = await Todo.find({ ownerID: id }).catch((err) => {
    res.status(500).json({ message: err.message });
  });
  res.json({
    success: true,
    todo: data,
  });
};
exports.createTodo = async (req, res) => {
  const { owner, ownerID, title, content } = req.body;

  const todo = await Todo.create({
    owner,
    ownerID,
    title,
    content,
  }).catch((err) => {
    const errors = err.errors;
    const keys = Object.keys(errors);
    const errorObj = {};
    keys.map((key) => {
      errorObj[key] = errors[key].message;
    });

    res.status(400).json({
      success: false,
      errors: errorObj,
    });
  });

  res.status(201).json(todo);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id).catch((err) => {
    return res.status(400).json({
      success: false,
    });
  });
  res.json({
    success: true,
  });
};
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  await Todo.findByIdAndUpdate({ _id: id }, { content }).catch((err) => {
    return res.status(400).json({
      success: false,
      message: "cant update",
    });
  });
  res.json({
    success: true,
  });
};
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await Todo.findByIdAndUpdate({ _id: id }, { status }).catch((err) => {
    return res.status(400).json({
      message: "can't find item",
      success: false,
    });
  });
  res.json({
    success: true,
    message: "item has been updated",
  });
};
