const { getFirestore } = require('../config/firebase');

/**
 * Get all matches for a user
 */
const getUserMatches = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (req.user.uid !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const db = getFirestore();
        const snapshot = await db.collection('matches')
            .where('users', 'array-contains', userId)
            .orderBy('matchedAt', 'desc')
            .get();

        const matches = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json({ matches });
    } catch (error) {
        next(error);
    }
};

/**
 * Get specific match details
 */
const getMatchDetails = async (req, res, next) => {
    try {
        const { matchId } = req.params;

        const db = getFirestore();
        const matchDoc = await db.collection('matches').doc(matchId).get();

        if (!matchDoc.exists) {
            return res.status(404).json({ error: 'Match not found' });
        }

        const matchData = matchDoc.data();

        // Verify user is part of the match
        if (!matchData.users.includes(req.user.uid)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        res.json({ match: { id: matchDoc.id, ...matchData } });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a match (unmatch)
 */
const deleteMatch = async (req, res, next) => {
    try {
        const { matchId } = req.params;

        const db = getFirestore();
        const matchDoc = await db.collection('matches').doc(matchId).get();

        if (!matchDoc.exists) {
            return res.status(404).json({ error: 'Match not found' });
        }

        const matchData = matchDoc.data();

        // Verify user is part of the match
        if (!matchData.users.includes(req.user.uid)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await db.collection('matches').doc(matchId).delete();

        res.json({ message: 'Match deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserMatches,
    getMatchDetails,
    deleteMatch
};
