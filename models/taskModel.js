const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  prority: {
    type: String,
    default: "Less Important",
  },
  description: {
    type: String,
    maxLength: [150, "FirstName Cannot exceed 150 Characters"],
  },
  completed:{
    type:Boolean,
    default:"false"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});
 
module.exports= mongoose.model("task",taskSchema)