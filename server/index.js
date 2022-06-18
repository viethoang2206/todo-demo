import sslRedirect from "heroku-ssl-redirect";
const express = require("express");
const fs = require("fs");
const { title } = require("process");
const cors = require("cors");
//const { PORT } = require("./config");
const connectDB = require("./config/db");

const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

connectDB();
app.use(sslRedirect());
app.use("/api/v1/todo", todoRoutes);
app.use("/api/v1/user", userRoutes);
const PORT = process.env.PORT || 3001;
app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
