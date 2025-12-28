import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiUsers, FiUser, FiLogOut, FiGrid } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
    const { logout, userProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navItems = [
        { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
        { path: '/swipe', icon: FiGrid, label: 'Discover' },
        { path: '/matches', icon: FiUsers, label: 'Teams' },
        { path: '/profile', icon: FiUser, label: 'Profile' }
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/dashboard" className="navbar-logo">
                    <span className="logo-icon">👥</span>
                    <span className="logo-text">TeamMate</span>
                </Link>

                <div className="navbar-links">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="navbar-actions">
                    {userProfile?.photoURL && (
                        <img
                            src={userProfile.photoURL}
                            alt={userProfile.displayName}
                            className="nav-avatar"
                        />
                    )}
                    <button onClick={handleLogout} className="btn-logout">
                        <FiLogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
