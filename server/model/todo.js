const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  ownerID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  content: String,
  status: {
    type: Boolean,
    default: false,
  },
});
const TodoSchema = mongoose.model("todos", todoSchema);

module.exports = TodoSchema;
