const Order = require('../models/Order');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const orders = await Order.find().populate('serviceId').populate('userId', 'name email');
  res.json(orders);
};

exports.getById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('serviceId').populate('userId', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { serviceId, scheduledDate } = req.body;
  const order = new Order({
    serviceId,
    userId: req.user._id,
    status: 'pending',
    requestDate: new Date(),
    scheduledDate
  });
  await order.save();
  res.status(201).json(order);
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

exports.delete = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json({ message: 'Order deleted' });
};