const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../../controllers/userController');
const auth = require('../middleware/auth');

// GET all users (admin only)
router.get('/', auth, userController.getAll);

// GET user by id
router.get('/:id', auth, userController.getById);

// UPDATE user
router.put('/:id', auth, [
  body('name').optional().notEmpty(),
  body('phone').optional().isString(),
  body('role').optional().isIn(['user', 'provider', 'admin'])
], userController.update);

// DELETE user (admin only)
router.delete('/:id', auth, userController.delete);

module.exports = router;
