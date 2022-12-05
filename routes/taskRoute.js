const express = require("express");

const router = express.Router();

const {
  createTask,
  getMyTasks,
  updateTask,
  getSingleTask,
  completedTask,
  getTasksByDate,
  deleteTask,
  deleteAlltask,
  deleteAllCompleted,
} = require("../controllers/taskcontroller");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/create").post(isAuthenticatedUser, createTask);
router.route("/me").get(isAuthenticatedUser, getMyTasks);
router.route("/:id/update").put(isAuthenticatedUser,updateTask)
router
  .route("/:id")
  .get(isAuthenticatedUser, getSingleTask)
  .delete(isAuthenticatedUser, deleteTask);
router.route("/user/completed").get(isAuthenticatedUser,completedTask)
router.route("/user/date").get(isAuthenticatedUser, getTasksByDate);
router.route("/delete/all").delete(isAuthenticatedUser, deleteAlltask);
router.route("/delete/completed").delete(isAuthenticatedUser, deleteAllCompleted)
module.exports = router;
