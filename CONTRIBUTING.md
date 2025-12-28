# Contributing to TeamMate

Thank you for your interest in contributing to TeamMate! This document provides guidelines for contributing to the project.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Clear description** of the enhancement
- **Use cases** - why is this useful?
- **Possible implementation** (optional)
- **Mockups or examples** (if applicable)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Write or update tests
5. Update documentation
6. Commit your changes (`git commit -m 'feat: Add AmazingFeature'`)
7. Push to the branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request

## 📋 Development Process

### Setting Up Development Environment

```bash
# Clone your fork
git clone https://github.com/your-username/teammate-app.git
cd teammate-app

# Install dependencies
npm run install-all

# Create .env files
cd client && cp .env.example .env
cd ../server && cp .env.example .env

# Configure Firebase (see SETUP.md)

# Start development
npm run dev
```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

Examples:
- `feature/video-calling`
- `fix/chat-message-order`
- `docs/update-readme`

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```
feat(swipe): add undo swipe functionality

fix(chat): resolve message ordering issue

docs(readme): update installation instructions

refactor(auth): simplify login logic
```

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
npm test

# Run with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for new features
- Update tests when modifying existing features
- Aim for good code coverage
- Test edge cases

**Example Test:**
```javascript
describe('UserProfile', () => {
  it('should display user information', () => {
    const user = { name: 'John Doe', college: 'Sahyadri' };
    render(<UserProfile user={user} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

## 💻 Code Style

### JavaScript/React

- Use functional components with hooks
- Use ES6+ syntax
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic

**Good:**
```javascript
const getUserMatches = async (userId) => {
  const matches = await fetchMatches(userId);
  return matches.filter(match => match.active);
};
```

**Avoid:**
```javascript
const f = async (id) => {
  const m = await g(id);
  return m.filter(x => x.a);
};
```

### File Organization

```javascript
// 1. Imports
import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Component.css';

// 2. Component
const Component = () => {
  // 3. Hooks
  const { user } = useAuth();
  const [state, setState] = useState();

  // 4. Effects
  useEffect(() => {
    // ...
  }, []);

  // 5. Event handlers
  const handleClick = () => {
    // ...
  };

  // 6. Render
  return (
    // JSX
  );
};

// 7. Export
export default Component;
```

### CSS

- Use CSS variables for colors
- Follow BEM naming for complex components
- Keep specificity low
- Use flexbox/grid for layouts

```css
/* Variables */
:root {
  --primary-color: #6366f1;
}

/* Component styles */
.component {
  color: var(--primary-color);
}

.component__element {
  /* ... */
}

.component--modifier {
  /* ... */
}
```

## 🔍 Code Review Process

### For Reviewers

- Be respectful and constructive
- Explain why changes are needed
- Appreciate good work
- Test the changes locally

### For Contributors

- Respond to all comments
- Make requested changes
- Don't take feedback personally
- Ask questions if unclear

## 📚 Documentation

Update documentation when:

- Adding new features
- Changing existing functionality
- Modifying setup process
- Adding new dependencies

**Files to update:**
- `README.md` - For user-facing changes
- `TECHNICAL_DOCS.md` - For technical details
- `SETUP.md` - For setup process changes
- Code comments - For complex logic

## 🎯 Feature Development Guidelines

### Before Starting

1. Check if feature already exists
2. Create an issue to discuss
3. Wait for approval from maintainers
4. Plan your implementation

### During Development

1. Keep changes focused
2. Write clean, readable code
3. Add tests
4. Update documentation
5. Commit frequently with clear messages

### Before Submitting PR

- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No console errors
- [ ] Feature works as expected
- [ ] Tested on different browsers (if frontend)

## 🚀 Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release tag
4. Deploy to production
5. Announce release

## 🤝 Community Guidelines

### Be Respectful

- Use welcoming language
- Respect different viewpoints
- Accept constructive criticism
- Focus on what's best for the community

### Be Professional

- Keep discussions on-topic
- Avoid personal attacks
- Don't spam
- Follow code of conduct

## 📞 Getting Help

- **Questions?** Open a discussion
- **Bug?** Create an issue
- **Feature idea?** Create an issue with label `enhancement`
- **Security issue?** Email maintainers directly

## 🎓 Learning Resources

### React
- [React Documentation](https://react.dev/)
- [React Hooks Guide](https://react.dev/reference/react)

### Firebase
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)

### Node.js
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/)

## 🏆 Recognition

Contributors will be:
- Listed in `CONTRIBUTORS.md`
- Mentioned in release notes
- Thanked publicly (with permission)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to TeamMate! 🎉**

Every contribution, no matter how small, helps make TeamMate better for everyone.
