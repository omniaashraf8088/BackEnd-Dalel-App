const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  // ...existing code...
  const users = await User.find().select('-passwordHash');
  res.json(users);
};

exports.getById = async (req, res) => {
  // ...existing code...
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.update = async (req, res) => {
  // ...existing code...
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, phone, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, phone, role },
    { new: true }
  ).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

exports.delete = async (req, res) => {
  // ...existing code...
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
};