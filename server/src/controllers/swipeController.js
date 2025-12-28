const { getFirestore } = require('../config/firebase');

/**
 * Record a swipe action
 */
const recordSwipe = async (req, res, next) => {
    try {
        const { targetUserId, direction } = req.body;
        const userId = req.user.uid;

        if (!targetUserId || !direction) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!['left', 'right'].includes(direction)) {
            return res.status(400).json({ error: 'Invalid direction' });
        }

        const db = getFirestore();

        // Record the swipe
        const swipeData = {
            userId,
            targetUserId,
            direction,
            timestamp: new Date().toISOString()
        };

        await db.collection('swipes').add(swipeData);

        // If it's a right swipe, check for mutual match
        let isMatch = false;
        if (direction === 'right') {
            const mutualSwipeSnapshot = await db.collection('swipes')
                .where('userId', '==', targetUserId)
                .where('targetUserId', '==', userId)
                .where('direction', '==', 'right')
                .get();

            if (!mutualSwipeSnapshot.empty) {
                // It's a match! Create match document
                isMatch = true;

                const matchData = {
                    users: [userId, targetUserId],
                    matchedAt: new Date().toISOString(),
                    lastMessage: null,
                    unreadCount: {
                        [userId]: 0,
                        [targetUserId]: 0
                    }
                };

                await db.collection('matches').add(matchData);
            }
        }

        res.json({
            message: 'Swipe recorded successfully',
            isMatch
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get swipe history for a user
 */
const getSwipeHistory = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (req.user.uid !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const db = getFirestore();
        const snapshot = await db.collection('swipes')
            .where('userId', '==', userId)
            .orderBy('timestamp', 'desc')
            .limit(100)
            .get();

        const swipes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json({ swipes });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    recordSwipe,
    getSwipeHistory
};
