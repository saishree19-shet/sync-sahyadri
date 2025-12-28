import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMatch } from '../context/MatchContext';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Matches.css';

const Matches = () => {
    const { matches, loading } = useMatch();

    if (loading) {
        return (
            <div className="matches-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading matches...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="matches-container">
            <div className="matches-content">
                <div className="matches-header">
                    <h1>Your Matches</h1>
                    <p>{matches.length} teammate{matches.length !== 1 ? 's' : ''} matched</p>
                </div>

                {matches.length > 0 ? (
                    <div className="matches-grid">
                        {matches.map(match => (
                            <MatchItem key={match.id} match={match} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">💔</div>
                        <h3>No matches yet</h3>
                        <p>Start swiping to find your perfect teammate!</p>
                        <Link to="/swipe" className="btn btn-primary">
                            Start Swiping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

const MatchItem = ({ match }) => {
    const { currentUser } = useAuth();
    const [otherUser, setOtherUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOtherUser = async () => {
            if (!currentUser || !match.users) return;

            try {
                // Find the other user's ID
                const otherUserId = match.users.find(uid => uid !== currentUser.uid);

                if (otherUserId) {
                    // Fetch other user's profile
                    const userDoc = await getDoc(doc(db, 'users', otherUserId));
                    if (userDoc.exists()) {
                        setOtherUser({
                            uid: otherUserId,
                            ...userDoc.data()
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching match user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOtherUser();
    }, [match, currentUser]);

    if (loading || !otherUser) {
        return (
            <div className="match-item">
                <div className="match-item-avatar">...</div>
                <div className="match-item-content">
                    <h3>Loading...</h3>
                </div>
            </div>
        );
    }

    return (
        <Link to={`/chat/${match.id}`} className="match-item">
            <div className="match-item-avatar">
                {otherUser.displayName.charAt(0)}
            </div>

            <div className="match-item-content">
                <h3>{otherUser.displayName}</h3>
                <p>{otherUser.year}nd Year {otherUser.branch}</p>
                <p className="match-college">{otherUser.college}</p>

                {otherUser.skills && otherUser.skills.length > 0 && (
                    <div className="match-skills">
                        {otherUser.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="badge badge-primary">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="match-item-action">
                <span className="chat-label">Chat →</span>
            </div>
        </Link>
    );
};

export default Matches;
