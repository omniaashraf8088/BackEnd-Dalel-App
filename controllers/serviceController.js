const Service = require('../models/Service');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res) => {
  const services = await Service.find().populate('category').populate('createdBy', 'name email');
  res.json(services);
};

exports.getById = async (req, res) => {
  const service = await Service.findById(req.params.id).populate('category').populate('createdBy', 'name email');
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
};

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, description, price, category, images, location } = req.body;
  const service = new Service({
    title,
    description,
    price,
    category,
    images,
    location,
    createdBy: req.user._id
  });
  await service.save();
  res.status(201).json(service);
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
};

exports.delete = async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json({ message: 'Service deleted' });
};