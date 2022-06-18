const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tsd2mac.mongodb.net/todo?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => console.log("cant connect"));
};

module.exports = connectDB;
