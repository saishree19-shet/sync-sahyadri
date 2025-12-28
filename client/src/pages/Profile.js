import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiCamera, FiPlus, FiX } from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
    const { userProfile, currentUser, updateUserProfile } = useAuth();
    const [editing, setEditing] = useState(!userProfile?.profileComplete);
    const [formData, setFormData] = useState({
        displayName: '',
        bio: '',
        college: '',
        year: '',
        branch: '',
        skills: [],
        interests: [],
        projectPreferences: []
    });
    const [newSkill, setNewSkill] = useState('');
    const [newInterest, setNewInterest] = useState('');
    const [newPreference, setNewPreference] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (userProfile) {
            setFormData({
                displayName: userProfile.displayName || '',
                bio: userProfile.bio || '',
                college: userProfile.college || '',
                year: userProfile.year || '',
                branch: userProfile.branch || '',
                skills: userProfile.skills || [],
                interests: userProfile.interests || [],
                projectPreferences: userProfile.projectPreferences || []
            });
        }
    }, [userProfile]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const addItem = (type, value, setter) => {
        if (!value.trim()) return;

        setFormData({
            ...formData,
            [type]: [...formData[type], value.trim()]
        });
        setter('');
    };

    const removeItem = (type, index) => {
        setFormData({
            ...formData,
            [type]: formData[type].filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setMessage('');

            await updateUserProfile(currentUser.uid, {
                ...formData,
                profileComplete: true
            });

            setMessage('Profile updated successfully!');
            setEditing(false);

            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error updating profile. Please try again.');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const commonSkills = [
        'React', 'Node.js', 'Python', 'Java', 'C++', 'JavaScript',
        'UI/UX Design', 'Machine Learning', 'Data Science', 'Mobile Development',
        'Cloud Computing', 'Cybersecurity', 'Blockchain', 'IoT'
    ];

    const commonInterests = [
        'Web Development', 'Mobile Apps', 'AI/ML', 'Game Development',
        'Blockchain', 'IoT', 'Cloud Computing', 'Data Analytics',
        'Cybersecurity', 'AR/VR', 'Robotics', 'DevOps'
    ];

    return (
        <div className="profile-container">
            <div className="profile-content">
                {message && (
                    <div className={`message ${message.includes('Error') ? 'error-message' : 'success-message'}`}>
                        {message}
                    </div>
                )}

                <div className="profile-header">
                    <div className="profile-avatar-large">
                        {userProfile?.photoURL ? (
                            <img src={userProfile.photoURL} alt={userProfile.displayName} />
                        ) : (
                            <span>{formData.displayName?.charAt(0)?.toUpperCase()}</span>
                        )}
                        {editing && (
                            <button className="avatar-upload">
                                <FiCamera />
                            </button>
                        )}
                    </div>

                    <div className="profile-header-info">
                        <h1>{formData.displayName || 'Your Name'}</h1>
                        <p>{formData.year && formData.branch ? `${formData.year}nd Year ${formData.branch}` : 'Student'}</p>
                        <p>{formData.college || 'Your College'}</p>
                    </div>

                    {!editing && (
                        <button onClick={() => setEditing(true)} className="btn btn-primary">
                            Edit Profile
                        </button>
                    )}
                </div>

                {editing ? (
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-section">
                            <h2>Basic Information</h2>

                            <div className="form-group">
                                <label htmlFor="displayName">Full Name *</label>
                                <input
                                    id="displayName"
                                    name="displayName"
                                    type="text"
                                    className="input"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    className="input"
                                    rows="4"
                                    placeholder="Tell us about yourself and what kind of projects you're interested in..."
                                    value={formData.bio}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="college">College</label>
                                    <input
                                        id="college"
                                        name="college"
                                        type="text"
                                        className="input"
                                        value={formData.college}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="year">Year</label>
                                    <select
                                        id="year"
                                        name="year"
                                        className="input"
                                        value={formData.year}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="branch">Branch</label>
                                    <input
                                        id="branch"
                                        name="branch"
                                        type="text"
                                        className="input"
                                        value={formData.branch}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Skills</h2>
                            <p className="section-description">Add skills you have or want to learn</p>

                            <div className="quick-add">
                                <div className="quick-add-chips">
                                    {commonSkills.map(skill => (
                                        !formData.skills.includes(skill) && (
                                            <button
                                                key={skill}
                                                type="button"
                                                className="chip-btn"
                                                onClick={() => addItem('skills', skill, setNewSkill)}
                                            >
                                                <FiPlus /> {skill}
                                            </button>
                                        )
                                    ))}
                                </div>
                            </div>

                            <div className="add-item-form">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Add a custom skill..."
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addItem('skills', newSkill, setNewSkill);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => addItem('skills', newSkill, setNewSkill)}
                                >
                                    <FiPlus /> Add
                                </button>
                            </div>

                            <div className="items-list">
                                {formData.skills.map((skill, index) => (
                                    <span key={index} className="item-tag">
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeItem('skills', index)}
                                        >
                                            <FiX />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Interests</h2>
                            <p className="section-description">What kind of projects excite you?</p>

                            <div className="quick-add">
                                <div className="quick-add-chips">
                                    {commonInterests.map(interest => (
                                        !formData.interests.includes(interest) && (
                                            <button
                                                key={interest}
                                                type="button"
                                                className="chip-btn"
                                                onClick={() => addItem('interests', interest, setNewInterest)}
                                            >
                                                <FiPlus /> {interest}
                                            </button>
                                        )
                                    ))}
                                </div>
                            </div>

                            <div className="add-item-form">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Add a custom interest..."
                                    value={newInterest}
                                    onChange={(e) => setNewInterest(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addItem('interests', newInterest, setNewInterest);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => addItem('interests', newInterest, setNewInterest)}
                                >
                                    <FiPlus /> Add
                                </button>
                            </div>

                            <div className="items-list">
                                {formData.interests.map((interest, index) => (
                                    <span key={index} className="item-tag">
                                        {interest}
                                        <button
                                            type="button"
                                            onClick={() => removeItem('interests', index)}
                                        >
                                            <FiX />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Project Preferences</h2>
                            <p className="section-description">What are you looking for in a project?</p>

                            <div className="add-item-form">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="e.g., Looking for a frontend developer, Need help with backend..."
                                    value={newPreference}
                                    onChange={(e) => setNewPreference(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addItem('projectPreferences', newPreference, setNewPreference);
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => addItem('projectPreferences', newPreference, setNewPreference)}
                                >
                                    <FiPlus /> Add
                                </button>
                            </div>

                            <div className="items-list">
                                {formData.projectPreferences.map((pref, index) => (
                                    <span key={index} className="item-tag">
                                        {pref}
                                        <button
                                            type="button"
                                            onClick={() => removeItem('projectPreferences', index)}
                                        >
                                            <FiX />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setEditing(false)}
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-view">
                        {formData.bio && (
                            <div className="profile-section">
                                <h2>About</h2>
                                <p>{formData.bio}</p>
                            </div>
                        )}

                        {formData.skills.length > 0 && (
                            <div className="profile-section">
                                <h2>Skills</h2>
                                <div className="items-list">
                                    {formData.skills.map((skill, index) => (
                                        <span key={index} className="badge badge-primary">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {formData.interests.length > 0 && (
                            <div className="profile-section">
                                <h2>Interests</h2>
                                <div className="items-list">
                                    {formData.interests.map((interest, index) => (
                                        <span key={index} className="badge badge-secondary">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {formData.projectPreferences.length > 0 && (
                            <div className="profile-section">
                                <h2>Looking For</h2>
                                <ul className="preferences-list">
                                    {formData.projectPreferences.map((pref, index) => (
                                        <li key={index}>{pref}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
