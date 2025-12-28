const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const matchRoutes = require('./matchRoutes');
const swipeRoutes = require('./swipeRoutes');

const { apiLimiter } = require('../middleware/rateLimiter');

// Apply rate limiting to all API routes
router.use(apiLimiter);

// Mount route modules
router.use('/users', userRoutes);
router.use('/matches', matchRoutes);
router.use('/swipes', swipeRoutes);

module.exports = router;
