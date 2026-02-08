const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// POST /users - Create a new user (Signup)
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ 
      message: 'User created successfully',
      userId: user._id,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// GET /users - List all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password -token');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// POST /users/login - User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username/password' });
    }

    // Check if user is already logged in on another device
    if (user.token) {
      return res.status(403).json({ error: 'You are already logged in on another device.' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid username/password' });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Save token to database
    user.token = token;
    await user.save();

    res.json({ 
      token,
      userId: user._id,
      username: user.username,
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error during login' });
  }
});

// POST /users/logout - User logout
router.post('/logout', auth, async (req, res) => {
  try {
    // Clear token from database
    req.user.token = null;
    await req.user.save();

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error during logout' });
  }
});

module.exports = router;
