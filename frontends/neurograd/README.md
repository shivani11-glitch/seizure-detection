# 🧠 NeuroGrad – Wellness & EEG Analysis App

A full-stack wellness companion with EEG report uploading, mood tracking, diary, sleep tracker, games, and calm space.

---

## 📁 Project Structure

```
neurograd/
├── backend/                  ← Node.js + Express + MongoDB
│   ├── models/
│   │   ├── User.js           ← Patient schema (name, email, phone, age, gender)
│   │   └── Report.js         ← EEG report schema
│   ├── routes/
│   │   ├── auth.js           ← Register & Login
│   │   ├── user.js           ← Get/Update profile
│   │   └── reports.js        ← Upload/Get/Delete EEG reports
│   ├── middleware/
│   │   └── authMiddleware.js ← JWT auth protection
│   ├── uploads/              ← EDF files stored here (auto-created)
│   ├── server.js             ← Main Express app
│   ├── .env                  ← Environment variables
│   └── package.json
│
└── frontend/                 ← HTML + Tailwind CSS + Vanilla JS
    ├── index.html            ← Login / Register page
    ├── css/
    │   └── shared.css        ← Shared styles + navbar
    ├── js/
    │   └── config.js         ← API config + auth helpers
    └── pages/
        ├── home.html         ← Dashboard (mood, stats, recent reports)
        ├── analysis.html     ← EEG upload + report list
        ├── diary.html        ← Diary entries
        ├── sleep.html        ← Sleep tracker
        ├── games.html        ← Memory game + breathing
        └── calm.html         ← Meditation timer + affirmations
```

---

## 🚀 HOW TO RUN

### STEP 1 – Install Prerequisites
Make sure you have installed:
- **Node.js** (v16+): https://nodejs.org
- **MongoDB** (local): https://www.mongodb.com/try/download/community
  OR use free **MongoDB Atlas** (cloud): https://www.mongodb.com/atlas

---

### STEP 2 – Start MongoDB

**Option A – Local MongoDB:**
Open a terminal and run:
```bash
mongod
```
(Keep this terminal open)

**Option B – MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/atlas
2. Create a free cluster
3. Get your connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/neurograd`)

---

### STEP 3 – Setup Backend

Open a **new terminal** and run these commands **one by one**:

```bash
# 1. Go into the backend folder
cd neurograd/backend

# 2. Install all packages
npm install

# 3. Open .env file and edit your MongoDB URI if needed
# The .env file already has a default local URI:
# MONGO_URI=mongodb://localhost:27017/neurograd
# If using Atlas, replace with your Atlas URI

# 4. Start the backend server
npm run dev
```

✅ You should see:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
```

**Keep this terminal open!**

---

### STEP 4 – Open Frontend

You have 2 options:

**Option A – VS Code Live Server (Recommended):**
1. Install the "Live Server" extension in VS Code
2. Open the `neurograd/frontend` folder in VS Code
3. Right-click on `index.html` → click **"Open with Live Server"**
4. Browser opens automatically at `http://127.0.0.1:5500`

**Option B – Just open in browser:**
1. Navigate to `neurograd/frontend/`
2. Double-click `index.html` to open in browser

---

### STEP 5 – Use the App

1. **Register** a new account with your details
2. You'll be taken to the **Home** dashboard
3. Go to **Analysis** to upload an `.edf` EEG file
4. Explore **Diary**, **Sleep**, **Games**, **Calm**

---

## 🔑 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new patient | No |
| POST | /api/auth/login | Login | No |
| GET | /api/user/profile | Get profile | Yes |
| PATCH | /api/user/profile | Update profile | Yes |
| POST | /api/reports/upload | Upload .edf file | Yes |
| GET | /api/reports | Get all your reports | Yes |
| GET | /api/reports/:id | Get one report | Yes |
| DELETE | /api/reports/:id | Delete report | Yes |

---

## ⚙️ Environment Variables (.env)

```env
MONGO_URI=mongodb://localhost:27017/neurograd
JWT_SECRET=neurograd_super_secret_key_2024
PORT=5000
```

- **MONGO_URI** – Your MongoDB connection string
- **JWT_SECRET** – Secret key for JWT tokens (change this in production!)
- **PORT** – Backend server port (default: 5000)

---

## 🗄️ Database Collections

**users** collection stores:
- name, email, password (hashed), phone, age, gender, timestamps

**reports** collection stores:
- user (ref), filename, originalName, filePath, fileSize, status, result, notes, timestamps

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| `MongoDB connection error` | Make sure MongoDB is running (`mongod`) or check your Atlas URI |
| `Cannot find module` | Run `npm install` inside the `backend` folder |
| `CORS error` in browser | Make sure backend is running on port 5000 |
| File upload fails | Only `.edf` files are accepted, max 50MB |
| Login not working | Check backend terminal for error messages |

---

## 📦 Tech Stack

- **Frontend**: HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (JSON Web Tokens) + bcryptjs
- **File Upload**: Multer (supports .edf files up to 50MB)
