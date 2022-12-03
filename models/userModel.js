const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter your First Name"],
    maxLength: [20, "FirstName Cannot exceed 30 Characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please Enter your First Name"],
    maxLength: [20, "FirstName Cannot exceed 30 Characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String, 
    required: [true, "Please Enter your Password"],
    minLength: [8, "Password should be 8 characters or more"],
    select: false,
  },
  lastLoggedIn:{
    type:Date
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  role:{
    type: String,
    default:"user"
  },
  verifyEmailToken: String,
  verifyEmailExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});
// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//resetPasswordToken generators
userSchema.methods.getResetPasswordToken = function () {
  //Generating token for reset
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and Add resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

userSchema.methods.getVerifyEmailToken = function () {
  //Generating token for Emaail Verification
  const verifyToken = crypto.randomBytes(20).toString("hex");

  //Hashing and Add emailVerificationToken to userSchema
  this.verifyEmailToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

  this.verifyEmailExpire = Date.now() + 10080 * 60 * 1000;
  return verifyToken;
};
module.exports = mongoose.model("user", userSchema);
