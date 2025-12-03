const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const serviceController = require('../../controllers/serviceController');
const auth = require('../middleware/auth');

// GET all services
router.get('/', serviceController.getAll);

// GET service by id
router.get('/:id', serviceController.getById);

// CREATE service
router.post('/', auth, [
  body('title').notEmpty(),
  body('price').optional().isFloat({ min: 0 }),
  body('category').optional().isMongoId(),
  body('images').optional().isArray(),
  body('location.city').optional().isString(),
  body('location.address').optional().isString(),
  body('location.coordinates.lng').optional().isFloat(),
  body('location.coordinates.lat').optional().isFloat()
], serviceController.create);

// UPDATE service
router.put('/:id', auth, [
  body('title').optional().notEmpty(),
  body('price').optional().isFloat({ min: 0 }),
  body('category').optional().isMongoId(),
  body('images').optional().isArray(),
  body('location.city').optional().isString(),
  body('location.address').optional().isString(),
  body('location.coordinates.lng').optional().isFloat(),
  body('location.coordinates.lat').optional().isFloat()
], serviceController.update);

// DELETE service
router.delete('/:id', auth, serviceController.delete);

module.exports = router;
