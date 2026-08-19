var express = require("express");
var router = express.Router();

const {
  getTask,
  getTasks,
  postTask,
  patchTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/tasks", getTasks);

router.get("/tasks/:taskId", getTask);

router.post("/tasks", postTask);

router.patch("/tasks:taskId", patchTask);

router.delete("/tasks:taskId", deleteTask);

module.exports = router;
