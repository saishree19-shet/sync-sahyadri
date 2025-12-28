import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, query, onSnapshot, addDoc, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FiSend, FiArrowLeft } from 'react-icons/fi';
import './Chat.css';

const Chat = () => {
    const { matchId } = useParams();
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [otherUser, setOtherUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    // Fetch other user data from the match
    useEffect(() => {
        const fetchOtherUser = async () => {
            if (!matchId || !currentUser) return;

            try {
                setLoading(true);
                // Get match document
                const matchDoc = await getDoc(doc(db, 'matches', matchId));

                if (matchDoc.exists()) {
                    const matchData = matchDoc.data();
                    // Find the other user's ID
                    const otherUserId = matchData.users.find(uid => uid !== currentUser.uid);

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
                }
            } catch (error) {
                console.error('Error fetching other user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOtherUser();
    }, [matchId, currentUser]);

    // Listen to messages (real-time)
    useEffect(() => {
        if (!matchId) return;

        const messagesRef = collection(db, 'matches', matchId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(messagesData);
        });

        return unsubscribe;
    }, [matchId]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        try {
            const messagesRef = collection(db, 'matches', matchId, 'messages');
            await addDoc(messagesRef, {
                text: newMessage.trim(),
                senderId: currentUser.uid,
                timestamp: new Date().toISOString()
            });

            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (loading) {
        return (
            <div className="chat-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-container">
            <div className="chat-wrapper">
                <div className="chat-header">
                    <Link to="/matches" className="back-link">
                        <FiArrowLeft />
                    </Link>

                    <div className="chat-user-info">
                        <div className="chat-avatar">
                            {otherUser.displayName.charAt(0)}
                        </div>
                        <div>
                            <h2>{otherUser.displayName}</h2>
                            <p>{otherUser.college}</p>
                        </div>
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.length === 0 ? (
                        <div className="chat-empty">
                            <p>Start a conversation with {otherUser.displayName}!</p>
                            <p>Say hi and discuss your project ideas 👋</p>
                        </div>
                    ) : (
                        messages.map(message => (
                            <div
                                key={message.id}
                                className={`message ${message.senderId === currentUser.uid ? 'sent' : 'received'}`}
                            >
                                <div className="message-bubble">
                                    {message.text}
                                </div>
                                <div className="message-time">
                                    {new Date(message.timestamp).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="chat-input-form">
                    <input
                        type="text"
                        className="input chat-input"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary send-btn"
                        disabled={!newMessage.trim()}
                    >
                        <FiSend />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
