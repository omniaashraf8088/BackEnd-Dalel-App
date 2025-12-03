const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await require('../../seed/seed')();
    res.json({ message: 'Database seeded!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
