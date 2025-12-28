const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const matchController = require('../controllers/matchController');

// Get all matches for a user
router.get('/user/:userId', verifyToken, matchController.getUserMatches);

// Get specific match details
router.get('/:matchId', verifyToken, matchController.getMatchDetails);

// Delete/unmatch
router.delete('/:matchId', verifyToken, matchController.deleteMatch);

module.exports = router;
