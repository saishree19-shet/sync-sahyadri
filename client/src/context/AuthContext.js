import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import Loader from '../components/Loader';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign up with email and password
    const signup = async (email, password, userData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Create user profile in Firestore
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                ...userData,
                email,
                createdAt: new Date().toISOString(),
                uid: userCredential.user.uid
            });

            return userCredential.user;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    // Login with email and password
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    // Login with Google
    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // Check if user profile exists
            const userDoc = await getDoc(doc(db, 'users', result.user.uid));

            if (!userDoc.exists()) {
                // Create basic profile for new Google users
                await setDoc(doc(db, 'users', result.user.uid), {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    createdAt: new Date().toISOString(),
                    uid: result.user.uid,
                    profileComplete: false
                });
            }

            return result.user;
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    };

    // Logout
    const logout = async () => {
        try {
            await signOut(auth);
            setUserProfile(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    // Update user profile
    const updateUserProfile = async (uid, data) => {
        try {
            await setDoc(doc(db, 'users', uid), data, { merge: true });
            setUserProfile(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error('Update profile error:', error);
            throw error;
        }
    };

    // Fetch user profile from Firestore
    const fetchUserProfile = async (uid) => {
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserProfile(docSnap.data());
                return docSnap.data();
            }
            return null;
        } catch (error) {
            console.error('Fetch profile error:', error);
            return null;
        }
    };

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            if (user) {
                await fetchUserProfile(user.uid);
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userProfile,
        signup,
        login,
        loginWithGoogle,
        logout,
        updateUserProfile,
        fetchUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};
