const express = require("express");

const router = express.Router();

const {
  createTask,
  getMyTasks,
  updateTask,
  getSingleTask,
  completedTask,
} = require("../controllers/taskcontroller");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/create").post(isAuthenticatedUser, createTask);
router.route("/me").get(isAuthenticatedUser, getMyTasks);
router.route("/:id/update").put(isAuthenticatedUser,updateTask)
router.route("/:id").get(isAuthenticatedUser,getSingleTask)
router.route("/user/completed").get(isAuthenticatedUser,completedTask)
module.exports = router;
