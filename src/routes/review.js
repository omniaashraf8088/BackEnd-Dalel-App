const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const reviewController = require('../../controllers/reviewController');
const auth = require('../middleware/auth');

// GET all reviews
router.get('/', reviewController.getAll);

// GET review by id
router.get('/:id', reviewController.getById);

// CREATE review
router.post('/', auth, [
  body('serviceId').isMongoId(),
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').optional().isString()
], reviewController.create);

// UPDATE review
router.put('/:id', auth, [
  body('rating').optional().isInt({ min: 1, max: 5 }),
  body('comment').optional().isString()
], reviewController.update);

// DELETE review
router.delete('/:id', auth, reviewController.delete);

module.exports = router;
