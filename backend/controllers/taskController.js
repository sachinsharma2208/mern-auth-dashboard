const Task = require("../models/Task");

// Create task
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      user: req.user,
    });
    res.json(task);
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTask, getTasks, deleteTask };
