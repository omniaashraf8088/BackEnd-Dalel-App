const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const orderController = require('../../controllers/orderController');
const auth = require('../middleware/auth');

// GET all orders
router.get('/', auth, orderController.getAll);

// GET order by id
router.get('/:id', auth, orderController.getById);

// CREATE order
router.post('/', auth, [
  body('serviceId').isMongoId(),
  body('scheduledDate').optional().isISO8601()
], orderController.create);

// UPDATE order
router.put('/:id', auth, [
  body('status').optional().isIn(['pending', 'accepted', 'rejected', 'completed']),
  body('scheduledDate').optional().isISO8601()
], orderController.update);

// DELETE order
router.delete('/:id', auth, orderController.delete);

module.exports = router;
