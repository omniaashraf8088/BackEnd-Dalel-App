require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/user'));
app.use('/api/services', require('./src/routes/service'));
app.use('/api/orders', require('./src/routes/order'));
app.use('/api/reviews', require('./src/routes/review'));
app.use('/api/categories', require('./src/routes/category'));
app.use('/api/seed', require('./src/routes/seed'));

// Error handling middleware
const { notFound, errorHandler } = require('./src/middleware/error');
app.use(notFound);
app.use(errorHandler);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
