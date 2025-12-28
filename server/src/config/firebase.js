const admin = require('firebase-admin');

let firebaseApp;

const initializeFirebase = () => {
    try {
        // Initialize Firebase Admin with service account
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            }),
            databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
        });

        console.log('✅ Firebase Admin initialized');
    } catch (error) {
        console.error('❌ Firebase Admin initialization error:', error);
    }
};

const getFirestore = () => {
    return admin.firestore();
};

const getAuth = () => {
    return admin.auth();
};

module.exports = {
    initializeFirebase,
    getFirestore,
    getAuth,
    admin
};
