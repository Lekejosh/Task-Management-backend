const User = require("../models/userModel");
const Task = require("../models/taskModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");

exports.createTask = catchAsyncErrors(async (req, res, next) => {
  const { date, prority, description } = req.body;
  const task = await Task.create({
    date,
    prority,
    description,
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    task,
  });
});

exports.getMyTasks = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    task,
  });
});

exports.updateTask = catchAsyncErrors(async (req, res, next) => {
  const updateTask = {
    prority: req.body.prority,
    date: req.body.date,
    description: req.body.description,
    completed: req.body.completed,
    
  };

  const task = await Task.findByIdAndUpdate(req.params.id, updateTask, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    task,
  });
});
