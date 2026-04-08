const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// GET /api/user/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// PATCH /api/user/profile
router.patch('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone, age, gender } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, age, gender },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Profile updated!', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

module.exports = router;
