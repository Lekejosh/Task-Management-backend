const Task = require("../models/taskModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");

exports.createTask = catchAsyncErrors(async (req, res, next) => {
  const { prority, description } = req.body;
  let date = req.body.date + "T00:00:00.00Z";
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
  const task = await Task.find({ user: req.user.id });
  if (!task) {
    return next(new ErrorHandler(`No Task Found`));
  }
  res.status(200).json({
    success: true,
    task,
  });
});

exports.getSingleTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.findById({ user: req.user._id, _id: req.params.id });
  if (!task) {
    return next(new ErrorHandler(`No Task with ${req.params.id}`));
  }
  res.status(200).json({ success: true, task });
});

exports.getTasksByDate = catchAsyncErrors(async (req, res, next) => {
  const q = req.query.q;
  let date = q + "T00:00:00.000Z";
  console.log(date);
  const task = await Task.find({ user: req.user._id, date: date });
  if (!task) {
    return next(new ErrorHandler(`No Task Found`));
  }
  res.status(200).json({ success: true, task });
});

exports.completedTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.find({ user: req.user._id, completed: true });
  if (!task) {
    return next(new ErrorHandler(`No Task Completed`));
  }
  res.status(200).json({ success: true, task });
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

exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.findById( req.params.id);
  if (!task) {
    return next(new ErrorHandler(`No task with this ${req.params.id}`));
  }
  await task.remove();

  res.status(200).json({ success: true, message: "Task Delete successfully" });
});

exports.deleteAlltask = catchAsyncErrors(async(req,res,next)=>{
  const task = await Task.deleteMany({user:req.user._id})
  if(!task){
    return next(new ErrorHandler(`No Task Found`))
  }
  res.status(200).json({
    success:true, message: "Deleted Successfully"
  })
})

exports.deleteAllCompleted = catchAsyncErrors(async(req,res,next)=>{
  const task = await Task.deleteMany({user:req.user._id,completed:true})
  if(!task){
    return next(new ErrorHandler('No Completed Task found'))
  }
  res.status(200).json({
    success:true,message:"Deleted Successfully"
  })
})