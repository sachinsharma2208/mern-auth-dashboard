const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");

// Create task
router.post("/", auth, createTask);

// Get all tasks
router.get("/", auth, getTasks);

// Delete task
router.delete("/:id", auth, deleteTask);

module.exports = router;
