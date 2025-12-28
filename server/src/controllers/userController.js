const { getFirestore } = require('../config/firebase');

/**
 * Get user profile by ID
 */
const getUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Verify user is requesting their own profile or is authorized
        if (req.user.uid !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const db = getFirestore();
        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user: userDoc.data() });
    } catch (error) {
        next(error);
    }
};

/**
 * Update user profile
 */
const updateUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (req.user.uid !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const db = getFirestore();
        const updateData = {
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        await db.collection('users').doc(userId).update(updateData);

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * Get potential matches for a user
 */
const getPotentialMatches = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { college, skills, limit = 50 } = req.query;

        const db = getFirestore();
        let query = db.collection('users').limit(parseInt(limit));

        // Apply filters
        if (college) {
            query = query.where('college', '==', college);
        }

        const snapshot = await query.get();

        // Get user's swipe history to filter out already swiped users
        const swipesSnapshot = await db.collection('swipes')
            .where('userId', '==', userId)
            .get();

        const swipedUserIds = new Set(swipesSnapshot.docs.map(doc => doc.data().targetUserId));

        // Filter out current user and already swiped users
        const potentialMatches = snapshot.docs
            .filter(doc => doc.id !== userId && !swipedUserIds.has(doc.id))
            .map(doc => ({ id: doc.id, ...doc.data() }));

        // Simple skill-based scoring (can be enhanced)
        if (skills) {
            const userSkills = skills.split(',');
            potentialMatches.forEach(match => {
                const matchSkills = match.skills || [];
                const commonSkills = userSkills.filter(skill =>
                    matchSkills.includes(skill)
                );
                match.score = commonSkills.length;
            });

            // Sort by score
            potentialMatches.sort((a, b) => (b.score || 0) - (a.score || 0));
        }

        res.json({ matches: potentialMatches });
    } catch (error) {
        next(error);
    }
};

/**
 * Get user statistics
 */
const getUserStats = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const db = getFirestore();

        // Get total matches
        const matchesSnapshot = await db.collection('matches')
            .where('users', 'array-contains', userId)
            .get();

        // Get total swipes
        const swipesSnapshot = await db.collection('swipes')
            .where('userId', '==', userId)
            .get();

        // Get likes given and received
        const likesGiven = swipesSnapshot.docs.filter(
            doc => doc.data().direction === 'right'
        ).length;

        const stats = {
            totalMatches: matchesSnapshot.size,
            totalSwipes: swipesSnapshot.size,
            likesGiven,
            profileViews: Math.floor(Math.random() * 50) + 10 // Mock data
        };

        res.json({ stats });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getPotentialMatches,
    getUserStats
};
