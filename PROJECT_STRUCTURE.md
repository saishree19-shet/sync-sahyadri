# TeamMate - Project Structure

```
TeamMate/
│
├── README.md                    # Project overview and quick start
├── SETUP.md                     # Detailed setup instructions
├── TECHNICAL_DOCS.md            # Technical documentation
├── package.json                 # Root package.json (workspaces)
├── .gitignore                   # Git ignore rules
├── firebase.json                # Firebase configuration
│
├── client/                      # React Frontend
│   ├── public/
│   │   ├── index.html          # HTML template
│   │   └── manifest.json       # PWA manifest
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.js       # Navigation bar
│   │   │   ├── Navbar.css
│   │   │   └── PrivateRoute.js # Protected route wrapper
│   │   ├── pages/              # Page components
│   │   │   ├── Landing.js      # Landing page
│   │   │   ├── Landing.css
│   │   │   ├── Login.js        # Login page
│   │   │   ├── Signup.js       # Signup page
│   │   │   ├── Auth.css        # Auth pages styles
│   │   │   ├── Dashboard.js    # User dashboard
│   │   │   ├── Dashboard.css
│   │   │   ├── Profile.js      # Profile management
│   │   │   ├── Profile.css
│   │   │   ├── Swipe.js        # Swipe interface
│   │   │   ├── Swipe.css
│   │   │   ├── Matches.js      # Match list
│   │   │   ├── Matches.css
│   │   │   ├── Chat.js         # Chat interface
│   │   │   ├── Chat.css
│   │   │   ├── Settings.js     # Settings page
│   │   │   └── Settings.css
│   │   ├── context/            # React Context
│   │   │   ├── AuthContext.js  # Authentication context
│   │   │   └── MatchContext.js # Matching context
│   │   ├── firebase/           # Firebase config
│   │   │   └── config.js       # Firebase initialization
│   │   ├── App.js              # Main App component
│   │   ├── App.css             # App styles
│   │   ├── index.js            # Entry point
│   │   └── index.css           # Global styles
│   ├── .env.example            # Environment variables template
│   └── package.json            # Client dependencies
│
├── server/                      # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── firebase.js     # Firebase Admin SDK setup
│   │   ├── controllers/        # Business logic
│   │   │   ├── userController.js
│   │   │   ├── matchController.js
│   │   │   └── swipeController.js
│   │   ├── middleware/         # Express middleware
│   │   │   ├── auth.js         # JWT verification
│   │   │   ├── errorHandler.js # Error handling
│   │   │   └── rateLimiter.js  # Rate limiting
│   │   ├── routes/             # API routes
│   │   │   ├── index.js        # Route aggregation
│   │   │   ├── userRoutes.js   # User endpoints
│   │   │   ├── matchRoutes.js  # Match endpoints
│   │   │   └── swipeRoutes.js  # Swipe endpoints
│   │   └── index.js            # Server entry point
│   ├── .env.example            # Environment variables template
│   └── package.json            # Server dependencies
│
└── firebase/                    # Firebase configuration files
    ├── firestore.rules         # Firestore security rules
    ├── firestore.indexes.json  # Firestore indexes
    └── storage.rules           # Storage security rules
```

## Key Directories Explained

### `/client` - Frontend Application

**Purpose:** User-facing React application

**Key Features:**
- Modern React 18 with Hooks
- Context API for state management
- Firebase SDK integration for real-time features
- Responsive design with custom CSS
- Route-based code splitting

**Main Components:**
- `Landing`: Marketing/landing page for unauthenticated users
- `Login/Signup`: Authentication flows
- `Dashboard`: User home with stats and recent matches
- `Profile`: User profile creation and editing
- `Swipe`: Tinder-style card swiping interface
- `Matches`: List of all matches
- `Chat`: Real-time messaging with matches
- `Settings`: User preferences

### `/server` - Backend API

**Purpose:** RESTful API server for complex operations

**Key Features:**
- Express.js framework
- Firebase Admin SDK for server-side operations
- JWT authentication
- Rate limiting for security
- Comprehensive error handling

**API Structure:**
- **Controllers:** Business logic and data operations
- **Routes:** Endpoint definitions
- **Middleware:** Auth, validation, rate limiting
- **Config:** Firebase Admin initialization

### `/firebase` - Firebase Configuration

**Purpose:** Security rules and database indexes

**Files:**
- `firestore.rules`: Database access control
- `storage.rules`: File upload permissions
- `firestore.indexes.json`: Query optimization

## Data Flow

### Authentication Flow
```
User → Login Page → Firebase Auth → AuthContext
                                    ↓
                            Store User State
                                    ↓
                          Redirect to Dashboard
```

### Swipe Flow
```
User → Swipe Component → MatchContext → Firebase SDK
                                         ↓
                                  Record in Firestore
                                         ↓
                                  Check for Match
                                         ↓
                                  Create Match (if mutual)
```

### Chat Flow
```
User → Chat Component → Send Message → Firestore
                                       ↓
                              Real-time Listener
                                       ↓
                              Update UI Instantly
```

## Technology Decisions

### Why React?
- **Component-Based:** Reusable UI components
- **Large Ecosystem:** Rich library support
- **Virtual DOM:** Efficient rendering
- **Hooks:** Clean state management

### Why Firebase?
- **Real-time:** Perfect for chat and live updates
- **Authentication:** Built-in, secure
- **Scalability:** Handles growth automatically
- **Cost-Effective:** Free tier for development

### Why Node.js Backend?
- **Custom Logic:** Complex matching algorithms
- **API Gateway:** Centralized request handling
- **Flexibility:** Easy to extend and integrate
- **JavaScript:** Same language as frontend

### Why Context API?
- **Built-in:** No external dependencies
- **Sufficient:** For this app's complexity
- **Type-Safe:** With TypeScript (optional)
- **Simple:** Easy to understand and maintain

## File Naming Conventions

- **Components:** PascalCase (e.g., `Navbar.js`)
- **Utilities:** camelCase (e.g., `formatDate.js`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_URL`)
- **CSS:** Match component name (e.g., `Navbar.css`)

## Import Order Convention

```javascript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 3. Firebase
import { getFirestore } from 'firebase/firestore';

// 4. Local components
import Navbar from './components/Navbar';

// 5. Context/Hooks
import { useAuth } from './context/AuthContext';

// 6. Utilities
import { formatDate } from './utils/date';

// 7. Styles
import './App.css';
```

## Environment Variables

### Client (.env)
- `REACT_APP_FIREBASE_*`: Firebase configuration
- `REACT_APP_API_URL`: Backend API URL

### Server (.env)
- `PORT`: Server port
- `NODE_ENV`: Environment (development/production)
- `FIREBASE_*`: Firebase Admin SDK credentials
- `CLIENT_URL`: Frontend URL for CORS

## Scripts

### Root Level
```bash
npm run dev          # Run both client and server
npm run install-all  # Install all dependencies
npm run client       # Run client only
npm run server       # Run server only
```

### Client
```bash
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
```

### Server
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm test             # Run tests
```

## Next Steps After Setup

1. **Create Firebase Project** (see SETUP.md)
2. **Configure Environment Variables**
3. **Install Dependencies** (`npm run install-all`)
4. **Deploy Security Rules** (`firebase deploy --only firestore:rules,storage:rules`)
5. **Start Development** (`npm run dev`)
6. **Create Test Users**
7. **Test Features**

## Best Practices

### Frontend
- Use functional components with hooks
- Keep components small and focused
- Implement error boundaries
- Use PropTypes or TypeScript
- Memoize expensive computations

### Backend
- Validate all inputs
- Use async/await for promises
- Implement proper error handling
- Add logging for debugging
- Use middleware for cross-cutting concerns

### Firebase
- Always use security rules
- Create necessary indexes
- Denormalize data when needed
- Use batch operations for multiple writes
- Enable offline persistence

### Git
- Write meaningful commit messages
- Create feature branches
- Review before merging
- Keep commits atomic
- Use .gitignore properly

---

**Project Version:** 1.0.0  
**Last Updated:** December 2025  
**Built for:** Sahyadri College & Beyond
