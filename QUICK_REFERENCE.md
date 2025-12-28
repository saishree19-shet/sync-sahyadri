# TeamMate - Quick Reference

## 🚀 Quick Start Commands

### First Time Setup
```bash
# 1. Install dependencies
npm run install-all

# 2. Configure environment
cd client && cp .env.example .env
cd ../server && cp .env.example .env

# 3. Edit .env files with your Firebase config

# 4. Deploy Firebase rules
firebase login
firebase init
firebase deploy --only firestore:rules,storage:rules

# 5. Start development
npm run dev
```

## 📦 Common Commands

### Development
```bash
npm run dev              # Start both client (3000) and server (5000)
npm run client          # Start only React frontend
npm run server          # Start only Node.js backend
```

### Building
```bash
cd client && npm run build    # Build React app for production
```

### Testing
```bash
cd client && npm test         # Run React tests
cd server && npm test         # Run backend tests
```

### Firebase
```bash
firebase login                           # Login to Firebase
firebase init                            # Initialize Firebase project
firebase deploy --only hosting          # Deploy frontend
firebase deploy --only firestore:rules  # Deploy Firestore rules
firebase deploy --only storage:rules    # Deploy Storage rules
```

## 🔧 Useful npm Scripts

### Client Scripts
```bash
cd client
npm start          # Development server (hot reload)
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from Create React App (irreversible!)
```

### Server Scripts
```bash
cd server
npm run dev        # Development with nodemon (auto-restart)
npm start          # Production server
npm test           # Run tests
```

## 📁 Important Files

### Configuration Files
- `client/.env` - Frontend environment variables
- `server/.env` - Backend environment variables
- `firebase.json` - Firebase project configuration
- `firebase/firestore.rules` - Database security rules
- `firebase/storage.rules` - Storage security rules

### Entry Points
- `client/src/index.js` - React app entry
- `client/src/App.js` - Main React component
- `server/src/index.js` - Express server entry

## 🌐 Default URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health:** http://localhost:5000/health

## 🔐 Environment Variables

### Client (.env)
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_API_URL=http://localhost:5000/api
```

### Server (.env)
```bash
PORT=5000
NODE_ENV=development
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
CLIENT_URL=http://localhost:3000
```

## 🔍 Debugging

### Check if servers are running
```bash
# Check frontend (should return HTML)
curl http://localhost:3000

# Check backend (should return JSON)
curl http://localhost:5000/health
```

### View logs
```bash
# Client logs are in browser console
# Server logs are in terminal where server is running
```

### Common Issues

**Port already in use:**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
lsof -ti:5000 | xargs kill -9  # Kill process on port 5000

# Windows
netstat -ano | findstr :3000   # Find PID
taskkill /PID <PID> /F         # Kill process
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Firebase permission denied:**
```bash
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

## 🎨 Project Structure

```
TeamMate/
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── firebase/
│   └── package.json
├── server/          # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   └── package.json
└── firebase/        # Firebase config
    ├── firestore.rules
    └── storage.rules
```

## 📚 Key Dependencies

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `firebase` - Firebase SDK
- `axios` - HTTP client
- `framer-motion` - Animations
- `react-icons` - Icons

### Backend
- `express` - Web framework
- `firebase-admin` - Firebase Admin SDK
- `cors` - CORS middleware
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting
- `morgan` - HTTP logger

## 🔄 Git Workflow

```bash
# Clone repository
git clone <repo-url>
cd "TeamMate"

# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push to remote
git push origin feature/your-feature

# Create pull request on GitHub
```

## 📊 Firebase Collections

- **users** - User profiles
- **swipes** - Swipe history
- **matches** - Matched users
- **matches/{id}/messages** - Chat messages

## 🔐 API Endpoints

### Users
```
GET    /api/users/:userId                      # Get profile
PUT    /api/users/:userId                      # Update profile
GET    /api/users/:userId/potential-matches    # Get matches
GET    /api/users/:userId/stats                # Get stats
```

### Matches
```
GET    /api/matches/user/:userId    # Get all matches
GET    /api/matches/:matchId        # Get match details
DELETE /api/matches/:matchId        # Delete match
```

### Swipes
```
POST   /api/swipes                      # Record swipe
GET    /api/swipes/user/:userId/history # Get history
```

## 🎯 Testing Checklist

- [ ] Create Firebase project
- [ ] Configure environment variables
- [ ] Install dependencies
- [ ] Deploy security rules
- [ ] Start development servers
- [ ] Create test user account
- [ ] Complete user profile
- [ ] Test swipe functionality
- [ ] Test matching
- [ ] Test chat messaging
- [ ] Verify real-time updates

## 📱 Features to Test

1. **Authentication**
   - Email/password signup
   - Google login
   - Logout

2. **Profile**
   - Create profile
   - Add skills/interests
   - Update information

3. **Swipe**
   - View user cards
   - Swipe left/right
   - See match notification

4. **Matches**
   - View match list
   - Open chat

5. **Chat**
   - Send messages
   - Real-time updates
   - Message history

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't start dev server | Check if port is available |
| Firebase errors | Verify .env configuration |
| Build fails | Delete node_modules, reinstall |
| Auth not working | Check Firebase Auth is enabled |
| Messages not sending | Verify Firestore rules deployed |

## 📖 Documentation

- [README.md](README.md) - Project overview
- [SETUP.md](SETUP.md) - Detailed setup guide
- [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md) - Technical details
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - File structure

## 🤝 Support

- Check documentation files
- Review console logs
- Check Firebase Console
- Verify environment variables

---

**Quick Tip:** Keep this file handy for daily development!
