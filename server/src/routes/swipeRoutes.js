const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { swipeLimiter } = require('../middleware/rateLimiter');
const swipeController = require('../controllers/swipeController');

// Record a swipe (with rate limiting)
router.post('/', verifyToken, swipeLimiter, swipeController.recordSwipe);

// Get swipe history for a user
router.get('/user/:userId/history', verifyToken, swipeController.getSwipeHistory);

module.exports = router;
