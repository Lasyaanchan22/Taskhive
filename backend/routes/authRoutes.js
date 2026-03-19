const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Register
router.post("/register", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      role: req.body.role
    });

    await user.save();
    res.send("User registered");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send("User not found");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.send("Wrong password");

    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;