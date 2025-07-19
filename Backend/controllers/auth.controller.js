import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!['Admin', 'User'].includes(role)) {
    return res.status(400).json({ message: 'Role must be Admin or User' });
  }

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'Bro, You have account already ' });
    }

    const user = new User({ username, password, role });
    await user.save();

    // ✅ Generate token right after registration
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // ✅ Send token in response
    res.status(201).json({
      message: 'User registered successfully',
      token,
      role: user.role,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Bro 😅, no account found with that username. Try registering first!' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Oops 🤕, wrong password. Try again or register if you haven’t yet!' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};