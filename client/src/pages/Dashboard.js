import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMatch } from '../context/MatchContext';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { FiHeart, FiUsers, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
    const { userProfile } = useAuth();
    const { matches, fetchMatches } = useMatch();
    const [stats, setStats] = useState({
        totalMatches: 0,
        recentMatches: 0,
        profileViews: 0
    });

    useEffect(() => {
        fetchMatches();
    }, [fetchMatches]);

    useEffect(() => {
        setStats({
            totalMatches: matches.length,
            recentMatches: matches.filter(m => {
                const matchDate = new Date(m.matchedAt);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return matchDate > weekAgo;
            }).length,
            profileViews: Math.floor(Math.random() * 50) + 10 // Mock data
        });
    }, [matches]);

    const recentMatches = matches.slice(0, 3);

    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <div className="welcome-section">
                    <div>
                        <h1>Welcome back, {userProfile?.displayName}! 👋</h1>
                        <p>Ready to find your next project teammate?</p>
                    </div>
                    <Link to="/swipe" className="btn btn-primary">
                        Start Swiping <FiArrowRight />
                    </Link>
                </div>

                {!userProfile?.profileComplete && (
                    <div className="alert-banner">
                        <div>
                            <strong>Complete your profile!</strong>
                            <p>Add skills and interests to get better matches</p>
                        </div>
                        <Link to="/profile" className="btn btn-secondary">
                            Complete Profile
                        </Link>
                    </div>
                )}

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                            <FiHeart style={{ color: '#10b981' }} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.totalMatches}</h3>
                            <p>Total Matches</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                            <FiUsers style={{ color: '#6366f1' }} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.recentMatches}</h3>
                            <p>This Week</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                            <FiTrendingUp style={{ color: '#f59e0b' }} />
                        </div>
                        <div className="stat-content">
                            <h3>{stats.profileViews}</h3>
                            <p>Profile Views</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2>Recent Matches</h2>
                            <Link to="/matches" className="view-all">View All</Link>
                        </div>

                        {recentMatches.length > 0 ? (
                            <div className="matches-list">
                                {recentMatches.map(match => (
                                    <MatchCard key={match.id} match={match} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state-small">
                                <p>No matches yet. Start swiping to find teammates!</p>
                                <Link to="/swipe" className="btn btn-primary">
                                    Find Teammates
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2>Quick Actions</h2>
                        </div>

                        <div className="quick-actions">
                            <Link to="/swipe" className="action-card">
                                <FiHeart size={24} />
                                <h3>Find Teammates</h3>
                                <p>Browse and swipe on potential matches</p>
                            </Link>

                            <Link to="/profile" className="action-card">
                                <FiUsers size={24} />
                                <h3>Edit Profile</h3>
                                <p>Update your skills and interests</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MatchCard = ({ match }) => {
    const { currentUser } = useAuth();
    const [otherUser, setOtherUser] = useState(null);

    useEffect(() => {
        const fetchOtherUser = async () => {
            try {
                // Get the other user's ID from the match
                const otherUserId = match.users.find(id => id !== currentUser.uid);

                if (otherUserId) {
                    const userDoc = await getDoc(doc(db, 'users', otherUserId));
                    if (userDoc.exists()) {
                        setOtherUser(userDoc.data());
                    }
                }
            } catch (error) {
                console.error('Error fetching other user:', error);
            }
        };

        fetchOtherUser();
    }, [match, currentUser.uid]);

    if (!otherUser) return null;

    return (
        <Link to={`/chat/${match.id}`} className="match-card-item">
            <div className="match-avatar">
                {otherUser.displayName.charAt(0)}
            </div>
            <div className="match-info">
                <h4>{otherUser.displayName}</h4>
                <p>{otherUser.college}</p>
            </div>
            <FiArrowRight className="match-arrow" />
        </Link>
    );
};

export default Dashboard;
