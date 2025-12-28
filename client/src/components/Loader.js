import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader-spinner"></div>
            <div className="loader-logo">
                <span>👥</span>
                <span>TeamMate</span>
            </div>
            <p className="loader-text">Loading your workspace...</p>
        </div>
    );
};

export default Loader;
