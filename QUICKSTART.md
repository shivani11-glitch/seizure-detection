# NeuroGrad - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Windows Users

1. **Open Terminal in the project folder**
   ```
   cd NeuroGrad/backend
   ```

2. **Run the startup script**
   ```
   start.bat
   ```

3. **Wait for both servers to start** (should see two Terminal windows)
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:8000`

4. **Open your browser** → Go to:
   ```
   http://localhost:8000/login.html
   ```

### Mac/Linux Users

1. **Open Terminal in the project folder**
   ```
   cd NeuroGrad/backend
   chmod +x start.sh
   ./start.sh
   ```

2. **Open your browser** → Go to:
   ```
   http://localhost:8000/login.html
   ```

## 👤 First Time Login

1. Click **"Sign up here"** on the login page
2. Fill in your information:
   - Username (required)
   - Email (required)
   - Password (min 6 characters)
   - Optional: Full name, age, gender
3. Click **"Create Account"**
4. You'll be automatically logged in!

## 📱 Features Available

### Home Page
- **Mood Check-in**: Select your current mood (Happy, Calm, Tired, Anxious, Sad)
- **Add Notes**: Write how you're feeling (optional)
- **Wellness Overview**: See your latest mood, sleep, and seizure entries
- **Quick Actions**: Fast access to other features

### Seizure Diary
- Log seizure events with:
  - Date and time
  - Duration
  - Type of seizure
  - Triggers
  - Symptoms
  - Medications taken
  - Additional notes

### Sleep Tracker
- Track your sleep:
  - Hours slept
  - Sleep quality
  - What helped/hindered sleep
- View 7-day sleep history

### Seizure Analysis
- View statistics:
  - Total seizures logged
  - Common triggers
  - Common symptoms
  - Average duration

### Emotional Regulation
- Journal your feelings:
  - What emotion are you experiencing
  - Which technique did you use
  - How effective was it (before/after rating)
  - Duration of exercise

### Mini-Games
- Relaxing games to help with emotional regulation
- Track scores and progress

## ⚙️ Settings

- Click the **user icon** (top right)
- **Logout**: Sign out of your account

## 🎨 Themes

Click the **palette icon** (top right) to switch between:
- Lavender Calm
- Mint Relax
- Soft Blue Focus

## 📊 Data Privacy

- ✅ All data is stored on your local computer
- ✅ Data is encrypted in transit (with HTTPS in production)
- ✅ No data is shared with third parties
- ✅ Only your device has access to your entries

## 🔧 Common Tasks

### Adding a Mood Entry
1. Go to **Home**
2. Click a mood button
3. Optionally add notes
4. Click **Save Entry**

### Logging Sleep
1. Go to **Sleep Tracker**
2. Enter hours slept
3. Select quality level
4. Add reasons if helpful
5. Save entry

### Recording a Seizure
1. Go to **Seizure Diary**
2. Fill in details (date, time, symptoms)
3. Add triggers that might be relevant
4. Save entry

### Viewing Your Data
- **Last entries**: Shown on Home page
- **All history**: Go to specific section (Sleep, Diary, etc.)
- **Analysis**: Go to **Analysis** tab for statistics

## 🆘 Troubleshooting

### "Cannot connect to server"
**Solution**: Make sure backend is running
```bash
# In backend folder:
python app.py
```

### "Login failed"
- Check username and password are correct
- Clear browser cookies (Ctrl+Shift+Delete)
- Try registering a new account

### "Data not saving"
- Check browser console for errors (F12)
- Verify backend is running
- Try refreshing the page

### "Can't access frontend"
**Solution**: Start frontend server
```bash
# In frontend folder:
python -m http.server 8000
```

## 📚 Advanced Usage

### Manual Backend Start (without script)

**Windows:**
```bash
cd NeuroGrad/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**Mac/Linux:**
```bash
cd NeuroGrad/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

### Manual Frontend Start (without script)

```bash
cd NeuroGrad/frontend
python -m http.server 8000
# or
python3 -m http.server 8000
```

Then open: `http://localhost:8000/login.html`

## 🔐 Security Tips

1. **Use a strong password** (mix of letters, numbers, special chars)
2. **Don't share your login** with others
3. **Log out** on shared computers
4. **Keep your browser updated** for security patches
5. **In production**: Always use HTTPS

## 💡 Tips for Better Tracking

### Mood Tracking
- Log mood multiple times daily to see patterns
- Add notes about what affects your mood
- Look for patterns before/after seizures

### Sleep Tracking
- Consistent bedtime helps get better data
- Track factors that improve sleep quality
- Correlate with seizure frequency

### Seizure Logging
- Record as soon as possible after event
- Note if any triggers were present
- Track medication effectiveness

### Analysis
- Check your data regularly for patterns
- Share analysis with your healthcare provider
- Use insights to adjust your routine

## 📖 API Documentation

For developers wanting to extend the application:
- See `backend/README.md` for complete API reference
- All endpoints require authentication (except login/register)
- Responses are in JSON format

## 🎯 Next Steps

1. ✅ Create your account
2. ✅ Log your first mood entry
3. ✅ Add sleep data
4. ✅ Record any recent seizures
5. ✅ Check the analysis dashboard
6. ✅ Try the emotional regulation exercises

## 📞 Support

- Check the main README for troubleshooting
- Review API documentation
- Check browser console for error messages

## 📝 Notes

- Data is stored locally in your browser's storage
- Backend uses SQLite database (change to PostgreSQL for production)
- All timestamps are in your local timezone
- Data backups are your responsibility

---

**Ready to get started?**
1. Open `login.html` in your browser
2. Create an account
3. Start tracking your health! 💙

The app works on:
- Desktop (Chrome, Firefox, Safari, Edge)
- Tablet (iPad, Android tablets)
- Mobile (iPhone, Android phones)

**Best experience on desktop, but mobile-optimized!**
