require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const Category = require('../src/models/Category');
const Service = require('../src/models/Service');
const Order = require('../src/models/Order');
const Review = require('../src/models/Review');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await User.deleteMany();
  await Category.deleteMany();
  await Service.deleteMany();
  await Order.deleteMany();
  await Review.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);

  const users = await User.insertMany([
    { name: 'Alice', email: 'alice@example.com', passwordHash, role: 'user' },
    { name: 'Bob', email: 'bob@example.com', passwordHash, role: 'provider' },
    { name: 'Admin', email: 'admin@example.com', passwordHash, role: 'admin' }
  ]);

  const categories = await Category.insertMany([
    { name: 'Cleaning', description: 'Home and office cleaning' },
    { name: 'Plumbing', description: 'Plumbing services' }
  ]);

  const services = await Service.insertMany([
    {
      title: 'Home Cleaning',
      description: 'Full house cleaning service',
      price: 100,
      category: categories[0]._id,
      images: ['https://via.placeholder.com/150'],
      location: {
        city: 'Cairo',
        address: '123 Main St',
        coordinates: { lng: 31.2357, lat: 30.0444 }
      },
      createdBy: users[1]._id
    },
    {
      title: 'Pipe Fixing',
      description: 'Fix leaking pipes',
      price: 50,
      category: categories[1]._id,
      images: ['https://via.placeholder.com/150'],
      location: {
        city: 'Giza',
        address: '456 Side St',
        coordinates: { lng: 31.2109, lat: 30.0131 }
      },
      createdBy: users[1]._id
    }
  ]);

  const orders = await Order.insertMany([
    {
      serviceId: services[0]._id,
      userId: users[0]._id,
      status: 'pending',
      requestDate: new Date(),
      scheduledDate: new Date()
    }
  ]);

  await Review.insertMany([
    {
      serviceId: services[0]._id,
      userId: users[0]._id,
      rating: 5,
      comment: 'Great service!'
    }
  ]);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seed();
