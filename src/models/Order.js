const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  requestDate: { type: Date, default: Date.now },
  scheduledDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
