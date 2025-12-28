import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    onSnapshot,
    orderBy,
    limit
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

const MatchContext = createContext();

export const useMatch = () => {
    const context = useContext(MatchContext);
    if (!context) {
        throw new Error('useMatch must be used within a MatchProvider');
    }
    return context;
};

export const MatchProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [matches, setMatches] = useState([]);
    const [swipedUsers, setSwipedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch user's matches
    const fetchMatches = useCallback(async () => {
        if (!currentUser) return;

        try {
            setLoading(true);
            const matchesRef = collection(db, 'matches');
            const q = query(
                matchesRef,
                where('users', 'array-contains', currentUser.uid),
                orderBy('matchedAt', 'desc')
            );

            const querySnapshot = await getDocs(q);
            const matchesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setMatches(matchesData);
        } catch (error) {
            console.error('Error fetching matches:', error);
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    // Listen to real-time matches
    useEffect(() => {
        if (!currentUser) return;

        const matchesRef = collection(db, 'matches');
        const q = query(
            matchesRef,
            where('users', 'array-contains', currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const matchesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log('Real-time matches updated:', matchesData);
            setMatches(matchesData);
        });

        return unsubscribe;
    }, [currentUser]);

    // Load swiped users history
    useEffect(() => {
        if (!currentUser) return;

        const loadSwipedUsers = async () => {
            try {
                const swipesRef = collection(db, 'swipes');
                const q = query(
                    swipesRef,
                    where('userId', '==', currentUser.uid)
                );

                const querySnapshot = await getDocs(q);
                const swipedIds = querySnapshot.docs.map(doc => doc.data().targetUserId);
                console.log('Previously swiped users:', swipedIds);
                setSwipedUsers(swipedIds);
            } catch (error) {
                console.error('Error loading swiped users:', error);
            }
        };

        loadSwipedUsers();
    }, [currentUser]);

    // Record a swipe
    const swipeUser = async (targetUserId, direction) => {
        if (!currentUser) {
            console.log('No current user, cannot swipe');
            return false;
        }

        if (!targetUserId) {
            console.error('Target user ID is undefined!');
            return false;
        }

        console.log('Recording swipe:', { userId: currentUser.uid, targetUserId, direction });

        try {
            const swipe = {
                userId: currentUser.uid,
                targetUserId,
                direction, // 'right' for like, 'left' for pass
                timestamp: new Date().toISOString()
            };

            // Add to swipes collection
            const swipeDoc = await addDoc(collection(db, 'swipes'), swipe);
            console.log('Swipe recorded with ID:', swipeDoc.id);

            // Update local state
            setSwipedUsers(prev => [...prev, targetUserId]);

            // If it's a right swipe, check for mutual match
            if (direction === 'right') {
                const isMatch = await checkForMatch(targetUserId);
                return isMatch;
            }

            return false;
        } catch (error) {
            console.error('Error recording swipe:', error);
            throw error;
        }
    };

    // Check if there's a mutual match
    const checkForMatch = async (targetUserId) => {
        try {
            console.log('Checking for mutual match with:', targetUserId);

            // Check if target user has swiped right on current user
            const swipesRef = collection(db, 'swipes');
            const q = query(
                swipesRef,
                where('userId', '==', targetUserId),
                where('targetUserId', '==', currentUser.uid),
                where('direction', '==', 'right')
            );

            const querySnapshot = await getDocs(q);
            console.log('Found', querySnapshot.size, 'matching swipes');

            if (!querySnapshot.empty) {
                // It's a match! Create match document
                console.log('It\'s a match! Creating match document...');
                await createMatch(targetUserId);
                return true;
            }
            console.log('No mutual match yet');
            return false;
        } catch (error) {
            console.error('Error checking for match:', error);
            return false;
        }
    };

    // Create a match
    const createMatch = async (targetUserId) => {
        try {
            const matchData = {
                users: [currentUser.uid, targetUserId],
                matchedAt: new Date().toISOString(),
                lastMessage: null,
                unreadCount: {
                    [currentUser.uid]: 0,
                    [targetUserId]: 0
                }
            };

            const matchDoc = await addDoc(collection(db, 'matches'), matchData);
            console.log('Match created with ID:', matchDoc.id);
        } catch (error) {
            console.error('Error creating match:', error);
            throw error;
        }
    };

    // Get potential matches (users to swipe on)
    const getPotentialMatches = useCallback(async (filters = {}) => {
        if (!currentUser) return [];

        try {
            setLoading(true);
            const usersRef = collection(db, 'users');
            let q = query(usersRef, limit(50));

            // Apply filters
            if (filters.college) {
                q = query(q, where('college', '==', filters.college));
            }

            const querySnapshot = await getDocs(q);
            console.log('Total users from query:', querySnapshot.size);

            // Log all users before filtering
            const allUsers = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    uid: data.uid || doc.id,
                    displayName: data.displayName,
                    college: data.college
                };
            });
            console.log('All users from database:', allUsers);
            console.log('Current user UID:', currentUser.uid);
            console.log('Already swiped users:', swipedUsers);

            // Filter out current user and already swiped users
            const potentialMatches = querySnapshot.docs
                .map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        uid: data.uid || doc.id, // Use document ID as fallback
                        ...data
                    };
                })
                .filter(user => {
                    const isCurrentUser = user.uid === currentUser.uid;
                    const alreadySwiped = swipedUsers.includes(user.uid);

                    if (isCurrentUser) {
                        console.log('Filtering out current user:', user.displayName);
                    }
                    if (alreadySwiped) {
                        console.log('Already swiped on:', user.displayName);
                    }

                    return !isCurrentUser && !alreadySwiped;
                });

            console.log('Potential matches after filtering:', potentialMatches.map(u => ({ name: u.displayName, uid: u.uid })));
            return potentialMatches;
        } catch (error) {
            console.error('Error fetching potential matches:', error);
            return [];
        } finally {
            setLoading(false);
        }
    }, [currentUser, swipedUsers]);

    const value = {
        matches,
        swipedUsers,
        loading,
        swipeUser,
        getPotentialMatches,
        fetchMatches
    };

    return (
        <MatchContext.Provider value={value}>
            {children}
        </MatchContext.Provider>
    );
};
