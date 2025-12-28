const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const userController = require('../controllers/userController');

// Get user profile
router.get('/:userId', verifyToken, userController.getUserProfile);

// Update user profile
router.put('/:userId', verifyToken, userController.updateUserProfile);

// Get potential matches based on filters
router.get('/:userId/potential-matches', verifyToken, userController.getPotentialMatches);

// Get user statistics
router.get('/:userId/stats', verifyToken, userController.getUserStats);

module.exports = router;
