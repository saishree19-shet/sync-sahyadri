import React, { useState, useEffect, useCallback } from 'react';
import { useMatch } from '../context/MatchContext';
import { useAuth } from '../context/AuthContext';
import { FiX, FiCheck, FiInfo } from 'react-icons/fi';
import './Swipe.css';

const Swipe = () => {
    const [users, setUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMatch, setShowMatch] = useState(false);
    const [matchedUser, setMatchedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { getPotentialMatches, swipeUser } = useMatch();
    const { userProfile } = useAuth();

    const loadUsers = useCallback(async () => {
        if (!userProfile) {
            console.log('No user profile yet, waiting...');
            setLoading(false);
            return;
        }
        console.log('Loading users for college:', userProfile.college);
        setLoading(true);
        const potentialMatches = await getPotentialMatches({
            college: userProfile?.college
        });
        console.log('Found potential matches:', potentialMatches);
        setUsers(potentialMatches);
        setLoading(false);
    }, [getPotentialMatches, userProfile]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleSwipe = async (direction) => {
        if (currentIndex >= users.length) {
            console.log('No more users to swipe');
            return;
        }

        const targetUser = users[currentIndex];
        console.log('Target user object:', targetUser);
        console.log('Target user UID:', targetUser.uid);
        console.log('Swiping', direction, 'on user:', targetUser.displayName);

        if (!targetUser.uid) {
            console.error('Target user has no UID!', targetUser);
            alert('Error: User data is incomplete. Please refresh the page.');
            return;
        }

        try {
            const isMatch = await swipeUser(targetUser.uid, direction);
            console.log('Swipe result - isMatch:', isMatch);

            if (isMatch && direction === 'right') {
                setMatchedUser(targetUser);
                setShowMatch(true);
                setTimeout(() => setShowMatch(false), 3000);
            }

            setCurrentIndex(prev => prev + 1);
        } catch (error) {
            console.error('Swipe error:', error);
            alert('Error recording swipe: ' + error.message);
        }
    };

    const currentUserCard = users[currentIndex];

    if (!userProfile) {
        return (
            <div className="swipe-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="swipe-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading potential collaborators...</p>
                </div>
            </div>
        );
    }

    if (!currentUserCard) {
        return (
            <div className="swipe-container">
                <div className="empty-state">
                    <div className="empty-state-icon">🎯</div>
                    <h3>All Profiles Reviewed</h3>
                    <p>You've reviewed all available profiles. Check back soon for new students!</p>
                    <button onClick={loadUsers} className="btn btn-primary">
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="swipe-container">
            {showMatch && (
                <div className="match-overlay">
                    <div className="match-card">
                        <h2>✅ Team Connection Established!</h2>
                        <p>You and {matchedUser?.displayName} are now connected. Start collaborating!</p>
                    </div>
                </div>
            )}

            <div className="swipe-header">
                <h2>Discover Collaborators</h2>
                <p>{users.length - currentIndex} student{users.length - currentIndex !== 1 ? 's' : ''} to review</p>
            </div>

            <div className="swipe-cards">
                <SwipeCard user={currentUserCard} onSwipe={handleSwipe} />
            </div>

            <div className="swipe-actions">
                <button
                    className="swipe-btn swipe-btn-pass"
                    onClick={() => handleSwipe('left')}
                    title="Pass"
                >
                    <FiX size={32} />
                </button>
                <button
                    className="swipe-btn swipe-btn-like"
                    onClick={() => handleSwipe('right')}
                    title="Connect"
                >
                    <FiCheck size={32} />
                </button>
            </div>
        </div>
    );
};

const SwipeCard = ({ user, onSwipe }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="card-wrapper">
            <div className={`profile-card ${flipped ? 'flipped' : ''}`}>
                <div className="card-front">
                    <div className="card-image">
                        {user.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName} />
                        ) : (
                            <div className="placeholder-image">
                                {user.displayName?.charAt(0)?.toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="card-content">
                        <h3>{user.displayName}</h3>
                        <p className="college-info">
                            {user.year}nd Year {user.branch} • {user.college}
                        </p>

                        {user.bio && <p className="bio">{user.bio}</p>}

                        {user.skills && user.skills.length > 0 && (
                            <div className="skills">
                                <h4>Skills</h4>
                                <div className="skill-tags">
                                    {user.skills.slice(0, 5).map((skill, idx) => (
                                        <span key={idx} className="badge badge-primary">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {user.interests && user.interests.length > 0 && (
                            <div className="interests">
                                <h4>Interests</h4>
                                <div className="interest-tags">
                                    {user.interests.slice(0, 3).map((interest, idx) => (
                                        <span key={idx} className="badge badge-secondary">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        className="info-btn"
                        onClick={() => setFlipped(true)}
                    >
                        <FiInfo /> More Info
                    </button>
                </div>

                <div className="card-back">
                    <button
                        className="back-btn"
                        onClick={() => setFlipped(false)}
                    >
                        ← Back
                    </button>

                    <div className="detailed-info">
                        <h3>About {user.displayName}</h3>

                        {user.bio && (
                            <div className="info-section">
                                <h4>Bio</h4>
                                <p>{user.bio}</p>
                            </div>
                        )}

                        {user.projectPreferences && user.projectPreferences.length > 0 && (
                            <div className="info-section">
                                <h4>Project Preferences</h4>
                                <ul>
                                    {user.projectPreferences.map((pref, idx) => (
                                        <li key={idx}>{pref}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {user.skills && user.skills.length > 0 && (
                            <div className="info-section">
                                <h4>All Skills</h4>
                                <div className="skill-tags">
                                    {user.skills.map((skill, idx) => (
                                        <span key={idx} className="badge badge-primary">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Swipe;
