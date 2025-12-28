# TeamMate - Technical Documentation

## Architecture Overview

TeamMate is a full-stack web application built with modern technologies for scalability and maintainability.

### Tech Stack

- **Frontend:** React 18 with Hooks
- **Backend:** Node.js with Express
- **Database:** Firebase Firestore (NoSQL)
- **Authentication:** Firebase Auth
- **Storage:** Firebase Storage
- **Real-time:** Firestore real-time listeners

### Architecture Pattern

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   React     │ ──HTTP──▶│   Node.js   │ ──SDK───▶│  Firebase   │
│   Client    │ ◀─JSON───│   Express   │ ◀─Data───│  Services   │
└─────────────┘         └─────────────┘         └─────────────┘
      │                                                  │
      └──────────Firebase SDK (Direct)──────────────────┘
         (Auth, Firestore Listeners, Storage)
```

## Frontend Architecture

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation bar
│   └── PrivateRoute.js # Auth-protected routes
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state
│   └── MatchContext.js # Matching/swipe logic
├── pages/              # Page components
│   ├── Landing.js      # Public landing page
│   ├── Login.js        # Authentication
│   ├── Signup.js       # User registration
│   ├── Dashboard.js    # User dashboard
│   ├── Profile.js      # Profile management
│   ├── Swipe.js        # Swipe interface
│   ├── Matches.js      # Match list
│   ├── Chat.js         # Messaging
│   └── Settings.js     # User settings
├── firebase/           # Firebase configuration
│   └── config.js       # Initialize Firebase
├── App.js              # Root component & routing
└── index.js            # Entry point
```

### State Management

**Context API** is used for global state:

1. **AuthContext**
   - Current user
   - User profile data
   - Auth methods (login, signup, logout)

2. **MatchContext**
   - Matches list
   - Swipe history
   - Match methods

### Data Flow

```
User Action → Component → Context → Firebase SDK → Firestore
                ↓                                      ↓
         Update UI State ←──────Real-time Listener────┘
```

## Backend Architecture

### API Structure

```
server/
├── src/
│   ├── config/
│   │   └── firebase.js       # Firebase Admin SDK
│   ├── controllers/
│   │   ├── userController.js # User operations
│   │   ├── matchController.js# Match operations
│   │   └── swipeController.js# Swipe operations
│   ├── middleware/
│   │   ├── auth.js           # Token verification
│   │   ├── errorHandler.js   # Error handling
│   │   └── rateLimiter.js    # Rate limiting
│   ├── routes/
│   │   ├── index.js          # Route aggregation
│   │   ├── userRoutes.js     # User endpoints
│   │   ├── matchRoutes.js    # Match endpoints
│   │   └── swipeRoutes.js    # Swipe endpoints
│   └── index.js              # Server entry point
└── package.json
```

### API Endpoints

#### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/:userId` | Get user profile | ✓ |
| PUT | `/:userId` | Update profile | ✓ |
| GET | `/:userId/potential-matches` | Get match candidates | ✓ |
| GET | `/:userId/stats` | Get user statistics | ✓ |

#### Match Routes (`/api/matches`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/user/:userId` | Get all user matches | ✓ |
| GET | `/:matchId` | Get match details | ✓ |
| DELETE | `/:matchId` | Delete match (unmatch) | ✓ |

#### Swipe Routes (`/api/swipes`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Record a swipe | ✓ |
| GET | `/user/:userId/history` | Get swipe history | ✓ |

### Authentication Flow

```
1. User logs in → Firebase Auth generates ID token
2. Client includes token in Authorization header
3. Backend verifies token using Firebase Admin SDK
4. Request proceeds if valid, 401 if invalid
```

## Database Schema

### Firestore Collections

#### Users Collection

```javascript
users/{userId}
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string | null,
  college: string,
  year: string,
  branch: string,
  bio: string,
  skills: string[],
  interests: string[],
  projectPreferences: string[],
  profileComplete: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Swipes Collection

```javascript
swipes/{swipeId}
{
  userId: string,        // Who swiped
  targetUserId: string,  // Who was swiped on
  direction: 'left' | 'right',
  timestamp: timestamp
}
```

#### Matches Collection

```javascript
matches/{matchId}
{
  users: string[],       // Array of 2 user IDs
  matchedAt: timestamp,
  lastMessage: string | null,
  unreadCount: {
    [userId]: number
  }
}
```

#### Messages Subcollection

```javascript
matches/{matchId}/messages/{messageId}
{
  text: string,
  senderId: string,
  timestamp: timestamp
}
```

### Indexes

Required composite indexes (auto-created or defined in firestore.indexes.json):

1. `swipes`: `(userId, timestamp desc)`
2. `swipes`: `(userId, targetUserId, direction)`
3. `matches`: `(users array-contains, matchedAt desc)`
4. `messages`: `(timestamp asc)`

## Security

### Firebase Security Rules

#### Firestore Rules

- **Users:** Read by anyone authenticated, write by owner only
- **Swipes:** Read/write by owner only
- **Matches:** Read/write by participants only
- **Messages:** Read/write by match participants only

#### Storage Rules

- **Profile Pictures:** Read by anyone, write by owner (5MB limit)
- **Chat Attachments:** Read/write by match participants (10MB limit)

### Backend Security

1. **Helmet.js:** Security headers
2. **CORS:** Restricted to client URL
3. **Rate Limiting:**
   - General API: 100 req/15min
   - Auth endpoints: 5 req/15min
   - Swipes: 30 req/min
4. **Token Verification:** All protected routes
5. **Input Validation:** Validate request data

## Matching Algorithm

### Current Implementation

```javascript
// Simple algorithm (can be enhanced)
1. Fetch users matching filters (college, etc.)
2. Filter out current user
3. Filter out already swiped users
4. If skills filter provided:
   - Calculate common skills score
   - Sort by score (descending)
5. Return sorted list
```

### Enhancement Opportunities

1. **Skill Matching Score**
   - Weighted by skill importance
   - Consider skill levels

2. **Interest Alignment**
   - Project type compatibility
   - Availability matching

3. **Collaborative Filtering**
   - "Users who matched with X also matched with Y"
   - ML-based recommendations

4. **Elo-style Rating**
   - Track successful collaborations
   - Rate user reliability

## Real-time Features

### Firestore Listeners

```javascript
// Example: Listen to matches
const unsubscribe = onSnapshot(
  query(matchesRef, where('users', 'array-contains', userId)),
  (snapshot) => {
    // Update UI with new matches
  }
);

// Cleanup on unmount
return unsubscribe;
```

### Chat Real-time Updates

Messages use Firestore real-time listeners for instant delivery.

```javascript
// Listen to messages in a match
const messagesRef = collection(db, 'matches', matchId, 'messages');
const q = query(messagesRef, orderBy('timestamp', 'asc'));

onSnapshot(q, (snapshot) => {
  const messages = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setMessages(messages);
});
```

## Performance Optimization

### Frontend

1. **Code Splitting:** React.lazy() for route-based splitting
2. **Memoization:** useMemo/useCallback for expensive computations
3. **Image Optimization:** Lazy loading, WebP format
4. **Bundle Size:** Tree shaking, minimal dependencies

### Backend

1. **Caching:** Cache user profiles (Redis in production)
2. **Pagination:** Limit query results
3. **Database Indexes:** Optimize query performance
4. **Connection Pooling:** Reuse Firebase connections

### Database

1. **Denormalization:** Store frequently accessed data together
2. **Batch Operations:** Group reads/writes
3. **Offline Persistence:** Enable Firestore offline mode

## Testing Strategy

### Frontend Testing

```bash
# Unit tests for components
npm test

# Coverage report
npm test -- --coverage
```

### Backend Testing

```bash
# API endpoint tests
cd server
npm test
```

### E2E Testing

```bash
# Cypress tests (to be added)
npm run cypress:open
```

## Deployment

### Frontend (Firebase Hosting)

```bash
npm run build
firebase deploy --only hosting
```

### Backend Options

1. **Firebase Cloud Functions**
   ```bash
   firebase init functions
   firebase deploy --only functions
   ```

2. **Heroku**
   ```bash
   heroku create teammate-api
   git push heroku main
   ```

3. **Docker**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY server/package*.json ./
   RUN npm install --production
   COPY server/ ./
   CMD ["node", "src/index.js"]
   ```

## Monitoring & Analytics

### Recommended Tools

1. **Firebase Analytics:** User engagement, retention
2. **Firebase Performance:** App performance metrics
3. **Sentry:** Error tracking
4. **LogRocket:** Session replay
5. **Google Analytics:** User behavior

## Future Enhancements

### Technical Improvements

1. **GraphQL API:** Replace REST with GraphQL
2. **WebSocket:** Real-time notifications
3. **Service Workers:** PWA support, offline mode
4. **Redis Caching:** Improve performance
5. **CDN:** Faster asset delivery

### Feature Additions

1. **Video Calling:** WebRTC integration
2. **Project Management:** Kanban boards
3. **Code Collaboration:** Live coding sessions
4. **AI Recommendations:** ML-powered matching
5. **Reputation System:** User ratings

## Contributing

### Code Style

- **JavaScript:** ESLint with Airbnb config
- **React:** Functional components with hooks
- **Commits:** Conventional commits format

### Pull Request Process

1. Create feature branch
2. Write tests
3. Update documentation
4. Submit PR with description

---

**Last Updated:** December 2025
