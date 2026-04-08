# NeuroGrad - Complete Setup Guide

A comprehensive epilepsy management web application with backend API, responsive frontend, and user authentication.

## Project Structure

```
NeuroGrad/
├── backend/              # Flask REST API
│   ├── app.py           # Main application
│   ├── models.py        # Database models
│   ├── config.py        # Configuration
│   ├── requirements.txt  # Python dependencies
│   ├── .env             # Environment variables
│   ├── routes/          # API endpoint handlers
│   │   ├── auth_routes.py
│   │   ├── mood_routes.py
│   │   ├── sleep_routes.py
│   │   ├── seizure_routes.py
│   │   ├── er_routes.py
│   │   ├── game_routes.py
│   │   └── user_routes.py
│   ├── neurograd.db     # SQLite database
│   └── README.md        # Backend documentation
│
└── frontend/            # Web application
    ├── index.html       # Main app page
    ├── login.html       # Login/Register page
    ├── css/
    │   ├── design-system.css
    │   ├── responsive.css      # NEW: Responsive utilities
    │   ├── login.css           # NEW: Login page styles
    │   └── ...other styles
    └── js/
        ├── api.js              # NEW: API service
        ├── auth.js             # NEW: Auth manager
        ├── login.js            # NEW: Login logic
        ├── app.js
        └── ...other scripts
```

## Quick Start

### Option 1: Run Backend & Frontend Separately

#### Backend Setup

```bash
cd NeuroGrad/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend
python app.py
```

The backend will start at `http://localhost:5000`

#### Frontend Setup

1. Open the frontend in a browser:
   - Simply open `NeuroGrad/frontend/login.html` in your browser
   - Or use a local server (recommended):

```bash
cd NeuroGrad/frontend

# Python 3
python -m http.server 8000

# Or use Node.js http-server if installed
npx http-server
```

Then open `http://localhost:8000/login.html`

### Option 2: Docker Deployment (Coming Soon)

## Features

### Complete Backend (Flask REST API)

✅ **User Management**
- Secure registration and login
- JWT-based authentication
- Password hashing with bcrypt
- User profile management
- Password change functionality

✅ **Mood Tracking**
- Log daily moods with notes
- Retrieve mood history
- Track patterns over time

✅ **Sleep Monitoring**
- Record sleep duration and quality
- Last 7 days tracking
- Sleep reasons/factors
- Update and delete entries

✅ **Seizure Diary**
- Comprehensive seizure logging
- Track triggers and symptoms
- Medication records
- Automatic analysis and statistics
- Common triggers/symptoms identification

✅ **Emotional Regulation**
- Journaling entries
- Technique tracking
- Effectiveness ratings
- Session duration tracking

✅ **Gaming System**
- Game score recording
- Leaderboards

✅ **API Health Check**
- `/api/health` endpoint for monitoring

### Responsive Frontend

✅ **Responsive Design**
- Mobile-first approach
- Tablet optimization
- Desktop experience
- Touch-friendly on mobile devices
- Fluid typography and spacing
- Touch targets (44px minimum)

✅ **Authentication Pages**
- Beautiful login page
- User registration
- Session management
- User menu with logout
- Remember me functionality

✅ **Features**
- Real-time mood tracking
- Sleep logging
- Seizure diary
- Analysis dashboard
- Mini-games
- Emotional regulation exercises
- Responsive layouts for all screen sizes
- Theme customization (Lavender, Mint, Blue)
- Dark/Light mode
- Smooth animations

## API Endpoints Reference

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

### Mood
- `POST /api/mood/add` - Add entry
- `GET /api/mood/all` - Get all
- `GET /api/mood/last` - Get last
- `DELETE /api/mood/<id>` - Delete

### Sleep
- `POST /api/sleep/add` - Add entry
- `GET /api/sleep/all` - Get all
- `GET /api/sleep/last-7` - Get 7 days
- `PUT /api/sleep/<id>` - Update
- `DELETE /api/sleep/<id>` - Delete

### Seizure
- `POST /api/seizure/add` - Add entry
- `GET /api/seizure/all` - Get all
- `GET /api/seizure/analysis` - Get analysis
- `PUT /api/seizure/<id>` - Update
- `DELETE /api/seizure/<id>` - Delete

### Emotional Regulation
- `POST /api/er/add` - Add entry
- `GET /api/er/all` - Get all
- `DELETE /api/er/<id>` - Delete

### Games
- `POST /api/game/add` - Add score
- `GET /api/game/all` - Get all
- `GET /api/game/leaderboard?game=<name>` - Get leaderboard

### User
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `POST /api/user/change-password` - Change password
- `GET /api/user/summary` - Get summary

## Default Credentials (After First Registration)

Create your own account through the registration page. First user will have full access.

## Configuration

### Backend (.env)

```env
FLASK_ENV=development              # or production
FLASK_DEBUG=True                   # Set to False in production
SECRET_KEY=your_secret_key         # Change this!
JWT_SECRET_KEY=your_jwt_secret     # Change this!
DATABASE_URL=sqlite:///neurograd.db # or postgresql://...
```

### Frontend (api.js)

The frontend is pre-configured to connect to `http://localhost:5000/api`. To change:

Edit `frontend/js/api.js`:
```javascript
const BASE_URL = 'http://localhost:5000/api'; // Change this
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations

- SQLite database (use PostgreSQL for production)
- Single-user backend configuration (add multi-tenancy for production)
- No email verification (consider adding)
- No data export feature (consider adding)

## Next Steps

1. **Customize UI**: Edit CSS files in `frontend/css/`
2. **Add more features**: 
   - Email notifications
   - Calendar integration
   - Data export (PDF, CSV)
   - Medication reminders
   - Emergency contacts
3. **Deploy**:
   - Frontend: Netlify, Vercel, GitHub Pages
   - Backend: Heroku, AWS, DigitalOcean
4. **Enhance Security**:
   - Add HTTPS/SSL
   - Implement rate limiting
   - Add CAPTCHA for registration
   - Two-factor authentication

## Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version

# Verify dependencies
pip list | grep Flask

# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check CORS is enabled
- Verify API.js BASE_URL is correct
- Check browser console for errors

### Database errors
- Delete `neurograd.db` and restart
- Check file permissions
- Ensure correct database URL in .env

### Login issues
- Clear browser cookies
- Check localStorage in DevTools
- Verify JWT secret in .env matches app.py

## Performance Tips

### Backend
- Use connection pooling for large databases
- Add caching for analysis endpoints
- Use pagination for large result sets
- Monitor query performance

### Frontend
- Enable compression for text assets
- Cache API responses client-side
- Lazy load images
- Use service workers for offline support

## Security Considerations

- **Change default secrets** before deployment
- Use HTTPS in production
- Implement rate limiting
- Add input validation/sanitization
- Regular security updates
- Monitor access logs
- Encrypt sensitive data

## Support & Documentation

For detailed API documentation, see:
- Backend: `NeuroGrad/backend/README.md`
- Frontend features: Check individual JS files

## License

MIT License - Feel free to use and modify for your needs.

## Contributors

Built with ❤️ for epilepsy management.

---

**Last Updated**: April 2026
