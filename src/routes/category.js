const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');
const auth = require('../middleware/auth');

// GET all categories
router.get('/', categoryController.getAll);

// GET category by id
router.get('/:id', categoryController.getById);

// CREATE category
router.post('/', auth, [
  body('name').notEmpty(),
  body('description').optional().isString()
], categoryController.create);

// UPDATE category
router.put('/:id', auth, [
  body('name').optional().notEmpty(),
  body('description').optional().isString()
], categoryController.update);

// DELETE category
router.delete('/:id', auth, categoryController.delete);

module.exports = router;
