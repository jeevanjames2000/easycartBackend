// controllers/authController.js
const User = require("../models/schema");
const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      res.status(200).json({
        message: "Login successful",
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  register: async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "User registered",
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};
