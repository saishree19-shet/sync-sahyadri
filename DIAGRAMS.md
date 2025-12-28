# TeamMate - Architecture Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        TeamMate System                       │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Browser    │         │   Node.js    │         │   Firebase   │
│              │         │   Server     │         │   Services   │
│  React App   │ ◄─────► │   Express    │ ◄─────► │              │
│              │  HTTP   │   REST API   │  Admin  │ - Firestore  │
│              │         │              │   SDK   │ - Auth       │
│              │ ◄───────────────────────────────► │ - Storage    │
│              │    Firebase Client SDK            │              │
└──────────────┘                                   └──────────────┘
```

## User Flow Diagram

### 1. Registration & Onboarding

```
┌─────────┐
│  Start  │
└────┬────┘
     │
     ▼
┌──────────────┐
│ Landing Page │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Sign Up    │◄─── Email/Password or Google
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Create Profile│
│              │
│ - Basic Info │
│ - Skills     │
│ - Interests  │
│ - Preferences│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Dashboard   │
└──────────────┘
```

### 2. Matching Flow

```
┌──────────────┐
│  Dashboard   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Swipe Page   │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│  Load Potential Matches  │
│                          │
│  Filter by:              │
│  - Not already swiped    │
│  - Same college (opt)    │
│  - Skill match (opt)     │
└──────┬───────────────────┘
       │
       ▼
┌──────────────┐
│ Display Card │
└──────┬───────┘
       │
   ┌───┴────┐
   ▼        ▼
┌─────┐  ┌──────┐
│Left │  │Right │
└──┬──┘  └───┬──┘
   │         │
   ▼         ▼
┌─────┐  ┌──────────────┐
│Pass │  │ Check Match  │
└─────┘  └───┬──────────┘
             │
        ┌────┴────┐
        ▼         ▼
    ┌─────┐   ┌───────┐
    │ No  │   │  Yes  │
    │Match│   │Match! │
    └─────┘   └───┬───┘
                  │
                  ▼
            ┌──────────┐
            │Show Alert│
            └──────────┘
```

### 3. Chat Flow

```
┌──────────────┐
│   Matches    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Select Match │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Chat Page   │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│  Real-time Messages  │
│                      │
│  ┌────────────────┐ │
│  │ User Message   │ │
│  └────────────────┘ │
│                      │
│  ┌────────────────┐ │
│  │ Match Message  │ │
│  └────────────────┘ │
└──────────────────────┘
```

## Component Hierarchy

```
App
├── Landing
├── Login
├── Signup
├── Dashboard (Protected)
│   ├── Navbar
│   ├── Stats Cards
│   ├── Recent Matches
│   └── Quick Actions
├── Profile (Protected)
│   ├── Navbar
│   ├── Profile Header
│   ├── Bio Section
│   ├── Skills Section
│   └── Interests Section
├── Swipe (Protected)
│   ├── Navbar
│   ├── Swipe Header
│   ├── Profile Card
│   │   ├── Card Front
│   │   └── Card Back
│   └── Swipe Actions
├── Matches (Protected)
│   ├── Navbar
│   ├── Matches Header
│   └── Match Grid
│       └── Match Items
├── Chat (Protected)
│   ├── Navbar
│   ├── Chat Header
│   ├── Messages List
│   └── Message Input
└── Settings (Protected)
    ├── Navbar
    └── Settings Sections
```

## Data Model

```
Users Collection
├── users/{userId}
    ├── uid: string
    ├── email: string
    ├── displayName: string
    ├── photoURL: string?
    ├── college: string
    ├── year: string
    ├── branch: string
    ├── bio: string
    ├── skills: string[]
    ├── interests: string[]
    ├── projectPreferences: string[]
    └── profileComplete: boolean

Swipes Collection
├── swipes/{swipeId}
    ├── userId: string
    ├── targetUserId: string
    ├── direction: 'left' | 'right'
    └── timestamp: timestamp

Matches Collection
├── matches/{matchId}
    ├── users: string[2]
    ├── matchedAt: timestamp
    ├── lastMessage: string?
    ├── unreadCount: {
    │   userId1: number
    │   userId2: number
    │   }
    └── messages (subcollection)
        └── messages/{messageId}
            ├── text: string
            ├── senderId: string
            └── timestamp: timestamp
```

## API Architecture

```
Client Request
     │
     ▼
┌─────────────────┐
│  Rate Limiter   │ ◄─── Prevent abuse
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Auth Middleware│ ◄─── Verify JWT token
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Routes      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Controllers    │ ◄─── Business logic
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Firebase Admin │ ◄─── Database operations
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Response JSON  │
└─────────────────┘
```

## State Management

```
AuthContext
├── currentUser
├── userProfile
├── signup()
├── login()
├── loginWithGoogle()
├── logout()
└── updateUserProfile()

MatchContext
├── matches
├── swipedUsers
├── loading
├── swipeUser()
├── getPotentialMatches()
└── fetchMatches()
```

## Security Layers

```
┌──────────────────────────────────┐
│         Frontend Auth            │ ◄─── Firebase Auth SDK
├──────────────────────────────────┤
│       Backend Auth Verify        │ ◄─── JWT Token Verification
├──────────────────────────────────┤
│    Firestore Security Rules      │ ◄─── Database-level access control
├──────────────────────────────────┤
│    Storage Security Rules        │ ◄─── File upload restrictions
├──────────────────────────────────┤
│       Rate Limiting              │ ◄─── Prevent abuse
├──────────────────────────────────┤
│      CORS Protection             │ ◄─── Origin validation
└──────────────────────────────────┘
```

## Matching Algorithm Flow

```
┌─────────────────┐
│ User swipes     │
│ right on target │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Record swipe    │
│ in Firestore    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Query: Has      │
│ target swiped   │
│ right on user?  │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌─────┐   ┌─────┐
│ No  │   │ Yes │
└─────┘   └──┬──┘
              │
              ▼
        ┌──────────┐
        │ Create   │
        │ Match    │
        └────┬─────┘
             │
             ▼
        ┌──────────┐
        │ Notify   │
        │ Both     │
        │ Users    │
        └──────────┘
```

## Real-time Data Flow

```
User A sends message
         │
         ▼
┌─────────────────┐
│ Firestore Write │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Firestore       │
│ Triggers        │
│ Listeners       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ User B's        │
│ onSnapshot      │
│ callback fires  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ User B sees     │
│ message instantly│
└─────────────────┘
```

## Deployment Flow

```
Development
     │
     ├─── npm run dev ──► Local testing (localhost)
     │
     ▼
Git Commit
     │
     ├─── git push ──► GitHub
     │
     ▼
Production Build
     │
     ├─── npm run build ──► Optimized assets
     │
     ▼
Firebase Deploy
     │
     ├─── firebase deploy ──► Hosting
     │
     ▼
Live Application
     │
     └─── your-app.web.app
```

## File Upload Flow

```
User selects file
     │
     ▼
┌─────────────────┐
│ Validate        │ ◄─── Check size, type
│ - Max 5MB       │
│ - Images only   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Upload to       │
│ Firebase        │
│ Storage         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Get download    │
│ URL             │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Update user     │
│ photoURL in     │
│ Firestore       │
└─────────────────┘
```

## Error Handling Flow

```
Error occurs
     │
     ▼
┌─────────────────┐
│ Try-Catch Block │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Log error       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Show user-      │
│ friendly message│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ (Optional)      │
│ Send to error   │
│ tracking service│
└─────────────────┘
```

---

These diagrams provide a visual understanding of how TeamMate works at different levels!
