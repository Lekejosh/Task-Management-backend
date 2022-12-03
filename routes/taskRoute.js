const express = require("express");

const router = express.Router();

const {
  createTask,
  getMyTasks,
  updateTask,
} = require("../controllers/taskcontroller");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/create").post(isAuthenticatedUser, createTask);
router.route("/me").get(isAuthenticatedUser, getMyTasks);
router.route("/:id/update").put(isAuthenticatedUser,updateTask)
module.exports = router;