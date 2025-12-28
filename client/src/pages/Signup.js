import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiUser, FiAlertCircle, FiBook } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        college: 'Sahyadri College of Engineering and Management',
        year: '2',
        branch: 'CSE'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const colleges = [
        'Sahyadri College of Engineering and Management',
        'NMIT Bangalore',
        'RV College of Engineering',
        'BMS College of Engineering',
        'Other'
    ];

    const branches = ['CSE', 'ISE', 'ECE', 'EEE', 'ME', 'CV', 'IT', 'AI/ML'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            setError('');
            setLoading(true);

            const userData = {
                displayName: formData.displayName,
                college: formData.college,
                year: formData.year,
                branch: formData.branch,
                bio: '',
                skills: [],
                interests: [],
                projectPreferences: [],
                profileComplete: false
            };

            await signup(formData.email, formData.password, userData);
            navigate('/profile');
        } catch (error) {
            setError(error.message || 'Failed to create account');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/profile');
        } catch (error) {
            setError('Failed to sign up with Google.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card signup-card">
                <div className="auth-header">
                    <h1 className="auth-logo">👥 TeamMate</h1>
                    <h2>Create Your Account</h2>
                    <p>Join our academic collaboration platform and build exceptional projects</p>
                </div>

                {error && (
                    <div className="error-message">
                        <FiAlertCircle />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="displayName">
                            <FiUser /> Full Name
                        </label>
                        <input
                            id="displayName"
                            name="displayName"
                            type="text"
                            className="input"
                            placeholder="John Doe"
                            value={formData.displayName}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            <FiMail /> Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="input"
                            placeholder="your.email@college.edu"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="college">
                                <FiBook /> College
                            </label>
                            <select
                                id="college"
                                name="college"
                                className="input"
                                value={formData.college}
                                onChange={handleChange}
                                disabled={loading}
                            >
                                {colleges.map(college => (
                                    <option key={college} value={college}>{college}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <select
                                id="year"
                                name="year"
                                className="input"
                                value={formData.year}
                                onChange={handleChange}
                                disabled={loading}
                            >
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="branch">Branch</label>
                            <select
                                id="branch"
                                name="branch"
                                className="input"
                                value={formData.branch}
                                onChange={handleChange}
                                disabled={loading}
                            >
                                {branches.map(branch => (
                                    <option key={branch} value={branch}>{branch}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <FiLock /> Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            <FiLock /> Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className="input"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <button
                    onClick={handleGoogleSignup}
                    className="btn btn-secondary w-full"
                    disabled={loading}
                >
                    <FcGoogle size={20} />
                    Continue with Google
                </button>

                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
