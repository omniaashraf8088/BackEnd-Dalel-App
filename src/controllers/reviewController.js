const Review = require('../models/Review');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const reviews = await Review.find().populate('serviceId').populate('userId', 'name email');
  res.json(reviews);
};

exports.getById = async (req, res) => {
  const review = await Review.findById(req.params.id).populate('serviceId').populate('userId', 'name email');
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { serviceId, rating, comment } = req.body;
  const review = new Review({
    serviceId,
    userId: req.user._id,
    rating,
    comment
  });
  await review.save();
  res.status(201).json(review);
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const review = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json(review);
};

exports.delete = async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  res.json({ message: 'Review deleted' });
};