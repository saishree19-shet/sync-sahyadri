import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MatchProvider } from './context/MatchContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Swipe from './pages/Swipe';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import Settings from './pages/Settings';

// Components
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <MatchProvider>
                    <div className="App">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Protected Routes */}
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Navbar />
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute>
                                        <Navbar />
                                        <Profile />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/swipe"
                                element={
                                    <PrivateRoute>
                                        <Navbar />
                                        <Swipe />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/matches"
                                element={
                                    <PrivateRoute>
                                        <Navbar />
                                        <Matches />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/chat/:matchId"
                                element={
                                    <PrivateRoute>
                                        <Navbar />
                                        <Chat />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/settings"
                                element={
                                    <PrivateRoute>
                                        <Navbar />
                                        <Settings />
                                    </PrivateRoute>
                                }
                            />

                            {/* Catch all */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </MatchProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
