
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// 👇 THESE LINES MUST BE THERE
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// 👇 MongoDB
mongoose.connect("mongodb+srv://taskhive:coollasya22@cluster0.r3bjpnz.mongodb.net/taskhive")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// 👇 Start server
app.listen(5000, () => console.log("Server running on port 5000"));