const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");


app.use(express.json());
app.use(cookieParser());


const task = require("./routes/taskRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", user);
app.use("/api/v1/task",task)

app.use(errorMiddleware);

module.exports = app;