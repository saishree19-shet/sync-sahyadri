import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiTarget, FiMessageCircle, FiZap, FiBriefcase, FiCode } from 'react-icons/fi';
import './Landing.css';

const Landing = () => {
    const features = [
        {
            icon: <FiTarget />,
            title: 'Intelligent Matching',
            description: 'AI-powered algorithm matches you with teammates based on complementary skills and project goals'
        },
        {
            icon: <FiUsers />,
            title: 'Cross-Institution Network',
            description: 'Connect with talented students across Sahyadri and partner colleges'
        },
        {
            icon: <FiMessageCircle />,
            title: 'Collaboration Hub',
            description: 'Built-in messaging to discuss project requirements and coordinate work'
        },
        {
            icon: <FiBriefcase />,
            title: 'Professional Profiles',
            description: 'Showcase your skills, projects, and academic achievements'
        }
    ];

    return (
        <div className="landing">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Build Better Projects with the
                        <span className="gradient-text"> Right Team</span>
                    </h1>
                    <p className="hero-subtitle">
                        TeamMate connects college students with complementary skills for academic projects.
                        Find collaborators, form teams, and achieve excellence together.
                    </p>
                    <div className="hero-actions">
                        <Link to="/signup" className="btn btn-primary btn-lg">
                            Join Platform
                        </Link>
                        <Link to="/login" className="btn btn-secondary btn-lg">
                            Sign In
                        </Link>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <div className="profile-mini">
                            <div className="avatar">💻</div>
                            <div>
                                <h4>Full Stack Developer</h4>
                                <p>2nd Year CSE</p>
                            </div>
                        </div>
                    </div>
                    <div className="floating-card card-2">
                        <div className="profile-mini">
                            <div className="avatar">🤖</div>
                            <div>
                                <h4>ML Engineer</h4>
                                <p>3rd Year IT</p>
                            </div>
                        </div>
                    </div>
                    <div className="floating-card card-3">
                        <div className="profile-mini">
                            <div className="avatar">📊</div>
                            <div>
                                <h4>Data Analyst</h4>
                                <p>2nd Year CSE</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="features-container">
                    <h2 className="section-title">Why TeamMate?</h2>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Create Profile</h3>
                            <p>Add your skills, interests, and project preferences</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Start Swiping</h3>
                            <p>Browse through potential teammates and swipe right on those you like</p>
                        </div>
                        <div className="step-arrow">→</div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Match & Chat</h3>
                            <p>When there's mutual interest, start chatting and collaborate!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="cta-content">
                    <h2>Ready to find your teammate?</h2>
                    <p>Join hundreds of students already collaborating on amazing projects</p>
                    <Link to="/signup" className="btn btn-primary btn-lg">
                        Start Matching Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 TeamMate</p>
            </footer>
        </div>
    );
};

export default Landing;
