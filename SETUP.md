# TeamMate - Setup Guide

## Quick Start

### 1. Prerequisites Installation

Install the required software:

```bash
# Check Node.js version (should be v14+)
node --version

# Check npm version
npm --version

# If not installed, download from https://nodejs.org/
```

### 2. Clone & Install Dependencies

```bash
# Navigate to project directory
cd "TeamMate"

# Install all dependencies (client + server)
npm run install-all
```

Or install separately:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Firebase Setup

#### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name it (e.g., "teammate-app")
4. Disable Google Analytics (optional)
5. Click "Create Project"

#### Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get Started"
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in method
   - Add your email as authorized domain

#### Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create Database"
3. Choose **Start in test mode** (we'll add security rules later)
4. Select location closest to your users
5. Click "Enable"

#### Enable Storage

1. Go to **Storage**
2. Click "Get Started"
3. Start in **test mode**
4. Click "Done"

#### Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register app with nickname "TeamMate Web"
5. Copy the `firebaseConfig` object

#### Get Service Account (for Backend)

1. In Project Settings, go to **Service Accounts** tab
2. Click "Generate new private key"
3. Save the JSON file securely
4. Extract values for `.env` file

### 4. Environment Configuration

#### Client Configuration

```bash
cd client
cp .env.example .env
```

Edit `client/.env`:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
REACT_APP_API_URL=http://localhost:5000/api
```

#### Server Configuration

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
NODE_ENV=development

# From service account JSON
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

CLIENT_URL=http://localhost:3000
```

**Important:** When copying the private key, keep the entire string including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`, and preserve the `\n` characters.

### 5. Deploy Firebase Security Rules

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (in project root)
firebase init

# Select:
# - Firestore
# - Storage
# - Hosting (optional)

# Use existing project
# Accept default files or use:
# - firestore.rules: firebase/firestore.rules
# - storage.rules: firebase/storage.rules

# Deploy rules
firebase deploy --only firestore:rules,storage:rules
```

Or manually copy rules from `firebase/firestore.rules` and `firebase/storage.rules` in Firebase Console.

### 6. Start Development Servers

#### Option 1: Run Both (Recommended)

```bash
# From project root
npm run dev
```

This starts both client (port 3000) and server (port 5000).

#### Option 2: Run Separately

```bash
# Terminal 1 - Client
cd client
npm start

# Terminal 2 - Server
cd server
npm run dev
```

### 7. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## Testing the Application

### Create Test Accounts

1. Go to http://localhost:3000
2. Click "Sign Up"
3. Create 2-3 test accounts with different:
   - Names
   - Colleges
   - Skills
   - Interests

### Test Features

1. **Profile Setup**
   - Complete profile with skills and interests
   - Add project preferences

2. **Swiping**
   - Go to Swipe page
   - Swipe on other users
   - Test match creation

3. **Matches**
   - View matches page
   - Check if mutual swipes create matches

4. **Chat**
   - Open a match
   - Send messages
   - Test real-time updates

## Troubleshooting

### Common Issues

#### 1. Firebase Connection Errors

**Problem:** "Firebase: Error (auth/invalid-api-key)"

**Solution:**
- Verify all Firebase config values in `.env` are correct
- Check if API key is enabled in Firebase Console > Project Settings
- Restart development server after changing `.env`

#### 2. Backend Authentication Errors

**Problem:** "Invalid token" or "Authentication error"

**Solution:**
- Verify service account credentials in `server/.env`
- Check private key format (should include `\n` for newlines)
- Ensure Firebase Admin SDK is initialized

#### 3. Firestore Permission Denied

**Problem:** "Missing or insufficient permissions"

**Solution:**
- Deploy security rules: `firebase deploy --only firestore:rules`
- For testing, temporarily use test mode rules
- Check rules in Firebase Console > Firestore > Rules

#### 4. Port Already in Use

**Problem:** "Port 3000 (or 5000) already in use"

**Solution:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

#### 5. Module Not Found Errors

**Problem:** "Cannot find module 'xyz'"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode

Enable detailed logging:

```bash
# Client
REACT_APP_DEBUG=true npm start

# Server
DEBUG=* npm run dev
```

## Production Deployment

### 1. Build for Production

```bash
# Build client
cd client
npm run build

# This creates optimized build in client/build
```

### 2. Deploy to Firebase Hosting

```bash
# From project root
firebase deploy --only hosting
```

### 3. Deploy Backend

Options:
- **Firebase Cloud Functions** (recommended for Firebase integration)
- **Heroku**
- **Google Cloud Run**
- **AWS EC2/Lambda**

### 4. Update Environment Variables

In production:
- Use production Firebase project
- Enable production security rules
- Set `NODE_ENV=production`
- Use environment secrets for sensitive data

## Next Steps

1. **Enhance Matching Algorithm**
   - Implement skill-based scoring
   - Add project type matching
   - Consider availability/timeline matching

2. **Add Features**
   - Project showcase/portfolio
   - Video calling integration
   - Notification system
   - Achievement badges

3. **Improve UI/UX**
   - Add animations
   - Implement dark mode
   - Mobile responsive improvements

4. **Testing**
   - Add unit tests
   - Integration tests
   - E2E testing with Cypress

5. **Analytics**
   - Track user engagement
   - Monitor match success rate
   - Analyze popular skills

## Support

For issues or questions:
- Check [README.md](README.md)
- Review Firebase documentation
- Check console logs for errors

---

**Happy Matching! 🤝**
