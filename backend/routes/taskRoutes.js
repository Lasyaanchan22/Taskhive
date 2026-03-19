const router = require("express").Router();
const Task = require("../models/task");

// Create task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get tasks by project
router.get("/:project_id", async (req, res) => {
  try {
    const tasks = await Task.find({ project_id: req.params.project_id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update task status
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;