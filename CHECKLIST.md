# TeamMate - Setup Checklist

Use this checklist to ensure proper setup of your TeamMate application.

## ☑️ Pre-Setup Checklist

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm v6+ installed (`npm --version`)
- [ ] Git installed (optional, for version control)
- [ ] Code editor installed (VS Code recommended)
- [ ] Modern browser (Chrome, Firefox, Edge)

## ☑️ Firebase Setup Checklist

### Create Firebase Project
- [ ] Go to [Firebase Console](https://console.firebase.google.com/)
- [ ] Click "Add Project"
- [ ] Enter project name (e.g., "teammate-sahyadri")
- [ ] Disable Google Analytics (or keep if needed)
- [ ] Wait for project creation

### Enable Authentication
- [ ] Navigate to Authentication section
- [ ] Click "Get Started"
- [ ] Enable "Email/Password" provider
- [ ] Enable "Google" provider
- [ ] Add your email to authorized domains

### Create Firestore Database
- [ ] Navigate to Firestore Database
- [ ] Click "Create Database"
- [ ] Choose "Start in test mode" (temporary)
- [ ] Select your location
- [ ] Click "Enable"

### Enable Storage
- [ ] Navigate to Storage
- [ ] Click "Get Started"
- [ ] Start in test mode
- [ ] Click "Done"

### Get Firebase Configuration
- [ ] Go to Project Settings (gear icon)
- [ ] Scroll to "Your apps"
- [ ] Click Web icon (`</>`)
- [ ] Register app with name "TeamMate"
- [ ] Copy `firebaseConfig` object
- [ ] Save for later (client/.env)

### Get Service Account
- [ ] In Project Settings, go to "Service Accounts"
- [ ] Click "Generate new private key"
- [ ] Download JSON file
- [ ] Keep it secure and private
- [ ] Extract values for server/.env

## ☑️ Project Setup Checklist

### Download/Clone Project
- [ ] Navigate to project folder
- [ ] Open terminal in "TeamMate" directory

### Install Dependencies
- [ ] Run `npm run install-all` OR
- [ ] Run `cd client && npm install`
- [ ] Run `cd ../server && npm install`

### Configure Client Environment
- [ ] Navigate to `client/` folder
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in Firebase config values:
  - [ ] REACT_APP_FIREBASE_API_KEY
  - [ ] REACT_APP_FIREBASE_AUTH_DOMAIN
  - [ ] REACT_APP_FIREBASE_PROJECT_ID
  - [ ] REACT_APP_FIREBASE_STORAGE_BUCKET
  - [ ] REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  - [ ] REACT_APP_FIREBASE_APP_ID
  - [ ] REACT_APP_API_URL (http://localhost:5000/api)

### Configure Server Environment
- [ ] Navigate to `server/` folder
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in server config:
  - [ ] PORT (5000)
  - [ ] NODE_ENV (development)
  - [ ] FIREBASE_PROJECT_ID
  - [ ] FIREBASE_CLIENT_EMAIL
  - [ ] FIREBASE_PRIVATE_KEY (keep quotes and \n)
  - [ ] CLIENT_URL (http://localhost:3000)

### Deploy Firebase Rules
- [ ] Install Firebase CLI: `npm install -g firebase-tools`
- [ ] Login: `firebase login`
- [ ] Initialize: `firebase init`
  - [ ] Select "Firestore"
  - [ ] Select "Storage"
  - [ ] Use existing project
  - [ ] Use `firebase/firestore.rules`
  - [ ] Use `firebase/storage.rules`
- [ ] Deploy: `firebase deploy --only firestore:rules,storage:rules`

## ☑️ Verification Checklist

### Start Servers
- [ ] Open terminal, run `npm run dev` OR
- [ ] Terminal 1: `cd client && npm start`
- [ ] Terminal 2: `cd server && npm run dev`

### Verify Client
- [ ] Open http://localhost:3000
- [ ] Landing page loads
- [ ] No console errors (F12)
- [ ] CSS loads properly

### Verify Server
- [ ] Open http://localhost:5000/health
- [ ] Returns `{"status":"OK",...}`
- [ ] Server terminal shows "Server running"

### Test Authentication
- [ ] Click "Sign Up" on landing page
- [ ] Fill registration form
- [ ] Submit form
- [ ] Check for errors in console
- [ ] Should redirect to profile page

### Test Firebase Connection
- [ ] Create account successfully
- [ ] Check Firebase Console > Authentication
- [ ] Your account should appear
- [ ] Check Firestore > users collection
- [ ] Your user document should exist

### Test Profile
- [ ] Complete profile with:
  - [ ] Name
  - [ ] Bio
  - [ ] Skills (add at least 3)
  - [ ] Interests (add at least 3)
- [ ] Save profile
- [ ] Check Firestore for updated data

### Test Swipe (Need 2+ users)
- [ ] Create second test account
- [ ] Complete profile
- [ ] Go to Swipe page
- [ ] Should see other user's card
- [ ] Try swiping left/right

### Test Matching
- [ ] Swipe right on User A
- [ ] Login as User B
- [ ] Swipe right on User A
- [ ] Should see "It's a Match!" notification
- [ ] Check Matches page
- [ ] Match should appear

### Test Chat
- [ ] Click on a match
- [ ] Send a message
- [ ] Open second browser/incognito
- [ ] Login as matched user
- [ ] Open same chat
- [ ] Should see message instantly

## ☑️ Common Issues Checklist

### If Frontend Won't Start
- [ ] Check if port 3000 is available
- [ ] Check .env file exists and is valid
- [ ] Delete node_modules, reinstall
- [ ] Check for syntax errors in code

### If Backend Won't Start
- [ ] Check if port 5000 is available
- [ ] Verify .env has all required variables
- [ ] Check Firebase credentials are correct
- [ ] Look for error messages in terminal

### If Firebase Errors
- [ ] Verify API key is correct
- [ ] Check if services are enabled in Console
- [ ] Verify security rules are deployed
- [ ] Check browser console for specific errors

### If Authentication Fails
- [ ] Verify Email/Password is enabled in Firebase
- [ ] Check .env values match Firebase config
- [ ] Clear browser cache and cookies
- [ ] Check Firebase Console > Authentication logs

### If Database Operations Fail
- [ ] Deploy Firestore rules
- [ ] Check rules in Firebase Console
- [ ] Verify user is authenticated
- [ ] Check browser console for errors

## ☑️ Production Deployment Checklist

### Pre-Deployment
- [ ] All features tested
- [ ] No console errors
- [ ] All environment variables set
- [ ] Firebase rules deployed
- [ ] Database indexes created

### Build Application
- [ ] Run `cd client && npm run build`
- [ ] Verify build/ folder created
- [ ] Test production build locally

### Deploy to Firebase Hosting
- [ ] Run `firebase deploy --only hosting`
- [ ] Wait for deployment
- [ ] Visit deployed URL
- [ ] Test all features on production

### Configure Production Environment
- [ ] Update client .env with production API URL
- [ ] Update server .env with production settings
- [ ] Deploy backend to hosting service
- [ ] Update CORS settings

### Post-Deployment
- [ ] Test all features on production
- [ ] Monitor error logs
- [ ] Check performance
- [ ] Set up analytics (optional)

## ☑️ Ongoing Maintenance Checklist

### Weekly
- [ ] Check error logs
- [ ] Review user feedback
- [ ] Monitor performance
- [ ] Update dependencies (if needed)

### Monthly
- [ ] Review Firebase usage
- [ ] Check for security updates
- [ ] Optimize database queries
- [ ] Review and update documentation

## 📝 Notes

### Important Reminders
- Keep `.env` files private (never commit to Git)
- Save service account JSON securely
- Use test mode rules only during development
- Deploy production rules before going live

### Support Resources
- [Setup Guide](SETUP.md) - Detailed instructions
- [Quick Reference](QUICK_REFERENCE.md) - Common commands
- [Technical Docs](TECHNICAL_DOCS.md) - In-depth details
- [Diagrams](DIAGRAMS.md) - Visual guides

## ✅ Setup Complete!

Once all items are checked, you should have a fully functional TeamMate application running locally!

### Next Steps
1. Create multiple test accounts
2. Test all features thoroughly
3. Customize for your needs
4. Deploy to production (when ready)

---

**Need Help?**
- Review documentation files
- Check Firebase Console logs
- Inspect browser console errors
- Review server terminal output

**Happy Coding! 🚀**
