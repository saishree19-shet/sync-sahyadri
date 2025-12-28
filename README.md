# Sync-Sahyadri ⚡
Syncing Skills, Building Teams, Empowering Sahyadri. 🤝

A Tinder-style matching app for college students to find teammates for mini-projects and collaborations.

## 🎯 Features

- **Smart Matching**: Swipe-based interface to find compatible teammates
- **Rich Profiles**: Showcase your skills, interests, and project ideas
- **Multi-College Support**: Connect with students across different colleges
- **Real-time Chat**: Message your matches instantly
- **Project Requests**: Post what you're looking for in a teammate
- **Advanced Filters**: Filter by college, skills, year, project type, etc.

## 🛠 Tech Stack

- **Frontend**: React.js with modern hooks
- **Backend**: Node.js with Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Hosting**: Firebase Hosting

## 📁 Project Structure

```
teammate-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API and Firebase services
│   │   ├── context/       # React Context
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Data models
│   │   └── config/       # Configuration
│   └── package.json
├── firebase/              # Firebase configuration
│   ├── firestore.rules   # Security rules
│   └── storage.rules     # Storage rules
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
cd "TeamMate"
```

2. Install dependencies for both client and server:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Configure Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password, Google)
   - Enable Firestore Database
   - Enable Storage
   - Copy your Firebase config

4. Set up environment variables:

**Client** (`client/.env`):
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_API_URL=http://localhost:5000/api
```

**Server** (`server/.env`):
```env
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
NODE_ENV=development
```

5. Run the application:

```bash
# Terminal 1 - Run client
cd client
npm start

# Terminal 2 - Run server
cd server
npm run dev
```

The app will be available at `http://localhost:3000`

## 📱 Key Features Explanation

### 1. User Authentication
- Sign up with email or Google
- Profile creation with skills and interests
- College selection and verification

### 2. Swipe Interface
- Tinder-style card swiping
- View project requests and user profiles
- Swipe right to show interest, left to pass

### 3. Matching Algorithm
- Mutual interest creates a match
- Skill compatibility scoring
- Project type alignment

### 4. Messaging
- Real-time chat with matches
- Project discussion channels
- File sharing capabilities

### 5. Project Management
- Create project requests
- Specify required skills
- Set project deadlines and goals

## 🏗 Architecture Decisions

### Why Firebase?
- **Real-time capabilities**: Perfect for chat and live updates
- **Scalability**: Handles growth without infrastructure management
- **Authentication**: Built-in, secure auth system
- **Cost-effective**: Free tier supports early development

### Why Node.js Backend?
- **Custom business logic**: Complex matching algorithms
- **API gateway**: Centralized request handling
- **Third-party integrations**: Easy to extend
- **Data validation**: Server-side security

### Component Architecture
- **Atomic design**: Reusable, composable components
- **Context API**: Global state management
- **Custom hooks**: Reusable logic
- **Service layer**: Separation of concerns

## 🔒 Security

- Firebase Security Rules for Firestore and Storage
- JWT token validation
- Input sanitization
- Rate limiting on API endpoints
- CORS configuration

## 🧪 Testing

```bash
# Run client tests
cd client
npm test

# Run server tests
cd server
npm test
```

## 📈 Future Enhancements

- [ ] AI-powered teammate recommendations
- [ ] Video call integration
- [ ] Project showcase portfolio
- [ ] Achievement and reputation system
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## 🤝 Contributing

This is a student project for Sahyadri College, but contributions and suggestions are welcome!

## 📄 License

MIT License - feel free to use this for your college projects!

---

**Built with ❤️ for Sahyadri College and beyond**
