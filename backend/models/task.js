const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "To Do" },
  project_id: String
});

module.exports = mongoose.model("Task", taskSchema);