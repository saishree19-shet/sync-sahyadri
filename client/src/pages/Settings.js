import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Settings.css';

const Settings = () => {
    const { currentUser } = useAuth();
    const [resetting, setResetting] = useState(false);

    const handleResetSwipes = async () => {
        if (!window.confirm('Are you sure you want to reset your swipe history? This will allow you to see all profiles again.')) {
            return;
        }

        try {
            setResetting(true);
            const swipesRef = collection(db, 'swipes');
            const q = query(swipesRef, where('userId', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);

            console.log('Deleting', querySnapshot.size, 'swipes...');

            const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);

            alert('Swipe history reset! Refresh the Swipe page to see profiles again.');
            window.location.reload();
        } catch (error) {
            console.error('Error resetting swipes:', error);
            alert('Error resetting swipes: ' + error.message);
        } finally {
            setResetting(false);
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-content">
                <h1>Settings</h1>

                <div className="settings-section">
                    <h2>Account Information</h2>
                    <div className="settings-item">
                        <label>Email</label>
                        <p>{currentUser?.email}</p>
                    </div>
                    <div className="settings-item">
                        <label>User ID</label>
                        <p className="text-mono">{currentUser?.uid}</p>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>Preferences</h2>
                    <div className="settings-item">
                        <label>Email Notifications</label>
                        <p className="text-secondary">Coming soon...</p>
                    </div>
                    <div className="settings-item">
                        <label>Match Filters</label>
                        <p className="text-secondary">Coming soon...</p>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>Developer Tools</h2>
                    <div className="settings-item">
                        <button
                            onClick={handleResetSwipes}
                            disabled={resetting}
                            className="btn btn-secondary"
                            style={{ backgroundColor: '#e74c3c', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: resetting ? 'not-allowed' : 'pointer' }}
                        >
                            {resetting ? 'Resetting...' : 'Reset Swipe History'}
                        </button>
                        <p className="text-secondary" style={{ fontSize: '12px', marginTop: '8px' }}>
                            Clear all your swipes to see profiles again (for testing)
                        </p>
                    </div>
                </div>

                <div className="settings-section">
                    <h2>About</h2>
                    <p className="about-text">
                        TeamMate v1.0.0 - Built for Sahyadri College
                    </p>
                    <p className="about-text">
                        Find your perfect project teammate through smart matching!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
