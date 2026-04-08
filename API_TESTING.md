// NEUROGRAD API TESTING EXAMPLES
// Use these cURL commands to test the API or use Postman/Insomnia

// ============================================
// AUTHENTICATION
// ============================================

// 1. REGISTER NEW USER
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "sarah_doe",
  "email": "sarah@example.com",
  "password": "SecurePass123!",
  "full_name": "Sarah Doe",
  "age": 32,
  "gender": "Female"
}

RESPONSE:
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "sarah_doe",
    "email": "sarah@example.com",
    "full_name": "Sarah Doe",
    "age": 32,
    "gender": "Female",
    "created_at": "2024-01-15T10:30:00"
  },
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

// 2. LOGIN
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "sarah_doe",
  "password": "SecurePass123!"
}

RESPONSE:
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "sarah_doe",
    "email": "sarah@example.com",
    "full_name": "Sarah Doe",
    "age": 32,
    "gender": "Female",
    "created_at": "2024-01-15T10:30:00"
  },
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

// 3. VERIFY TOKEN
GET http://localhost:5000/api/auth/verify
Authorization: Bearer <your_access_token>

RESPONSE:
{
  "user": {
    "id": 1,
    "username": "sarah_doe",
    "email": "sarah@example.com",
    "full_name": "Sarah Doe",
    "age": 32,
    "gender": "Female",
    "created_at": "2024-01-15T10:30:00"
  },
  "authenticated": true
}

// ============================================
// MOOD TRACKING
// ============================================

// 1. ADD MOOD ENTRY
POST http://localhost:5000/api/mood/add
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "mood": "Happy",
  "emoji": "😊",
  "note": "Had a wonderful day today! Feeling energized and positive."
}

RESPONSE:
{
  "message": "Mood logged",
  "data": {
    "id": "60d5ec491c9d440000000000",
    "mood": "Happy",
    "emoji": "😊",
    "note": "Had a wonderful day today! Feeling energized and positive.",
    "ts": 1705316400000
  }
}

// 2. GET ALL MOOD ENTRIES
GET http://localhost:5000/api/mood/all
Authorization: Bearer <access_token>

RESPONSE:
{
  "count": 5,
  "moods": [
    {
      "id": "60d5ec491c9d440000000000",
      "mood": "Happy",
      "emoji": "😊",
      "note": "Had a wonderful day!",
      "ts": 1705316400000
    },
    // ... more entries
  ]
}

// 3. GET LAST MOOD ENTRY
GET http://localhost:5000/api/mood/last
Authorization: Bearer <access_token>

RESPONSE:
{
  "mood": {
    "id": "60d5ec491c9d440000000000",
    "mood": "Happy",
    "emoji": "😊",
    "note": "Had a wonderful day!",
    "ts": 1705316400000
  }
}

// 4. DELETE MOOD ENTRY
DELETE http://localhost:5000/api/mood/60d5ec491c9d440000000000
Authorization: Bearer <access_token>

RESPONSE:
{
  "message": "Mood deleted"
}

// ============================================
// SLEEP TRACKING
// ============================================

// 1. ADD SLEEP ENTRY
POST http://localhost:5000/api/sleep/add
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "hours": 7.5,
  "quality": "Good",
  "reasons": ["Comfortable mattress", "Dark room", "Cool temperature"],
  "date": "2024-01-15"
}

RESPONSE:
{
  "message": "Sleep logged",
  "data": {
    "id": "60d5ec491c9d440000000001",
    "hours": 7.5,
    "quality": "Good",
    "reasons": ["Comfortable mattress", "Dark room", "Cool temperature"],
    "date": "2024-01-15",
    "ts": 1705316400000
  }
}

// 2. GET ALL SLEEP ENTRIES
GET http://localhost:5000/api/sleep/all
Authorization: Bearer <access_token>

// 3. GET LAST 7 DAYS SLEEP DATA
GET http://localhost:5000/api/sleep/last-7
Authorization: Bearer <access_token>

RESPONSE:
{
  "last_7_days": [
    {
      "label": "Mon",
      "hours": 7,
      "date": "2024-01-08"
    },
    {
      "label": "Tue",
      "hours": 6.5,
      "date": "2024-01-09"
    },
    // ... more days
  ]
}

// 4. UPDATE SLEEP ENTRY
PUT http://localhost:5000/api/sleep/60d5ec491c9d440000000001
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "hours": 8,
  "quality": "Excellent",
  "reasons": ["Took a walk before bed"]
}

// 5. DELETE SLEEP ENTRY
DELETE http://localhost:5000/api/sleep/60d5ec491c9d440000000001
Authorization: Bearer <access_token>

// ============================================
// SEIZURE TRACKING
// ============================================

// 1. ADD SEIZURE ENTRY
POST http://localhost:5000/api/seizure/add
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "date": "2024-01-15",
  "time": "14:30:00",
  "duration": 45,
  "type": "Tonic-Clonic",
  "triggers": ["Stress", "Lack of sleep", "Bright lights"],
  "symptoms": ["Aura", "Loss of consciousness", "Muscle rigidity"],
  "medications": ["Levetiracetam"],
  "notes": "Had an aura about 2 minutes before onset. Seizure lasted about 45 seconds."
}

RESPONSE:
{
  "message": "Seizure entry added",
  "data": {
    "id": "60d5ec491c9d440000000002",
    "date": "2024-01-15",
    "time": "14:30:00",
    "duration": 45,
    "type": "Tonic-Clonic",
    "triggers": ["Stress", "Lack of sleep", "Bright lights"],
    "symptoms": ["Aura", "Loss of consciousness", "Muscle rigidity"],
    "medications": ["Levetiracetam"],
    "notes": "Had an aura about 2 minutes before onset...",
    "ts": 1705316400000
  }
}

// 2. GET ALL SEIZURE ENTRIES
GET http://localhost:5000/api/seizure/all
Authorization: Bearer <access_token>

// 3. GET SEIZURE ANALYSIS/STATISTICS
GET http://localhost:5000/api/seizure/analysis
Authorization: Bearer <access_token>

RESPONSE:
{
  "total_seizures": 12,
  "average_duration": 42.5,
  "by_type": {
    "Tonic-Clonic": 8,
    "Absence": 3,
    "Partial": 1
  },
  "common_triggers": [
    ["Stress", 7],
    ["Lack of sleep", 6],
    ["Bright lights", 4]
  ],
  "common_symptoms": [
    ["Aura", 5],
    ["Muscle rigidity", 4],
    ["Loss of consciousness", 3]
  ]
}

// 4. UPDATE SEIZURE ENTRY
PUT http://localhost:5000/api/seizure/60d5ec491c9d440000000002
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "duration": 50,
  "notes": "Updated duration after review"
}

// 5. DELETE SEIZURE ENTRY
DELETE http://localhost:5000/api/seizure/60d5ec491c9d440000000002
Authorization: Bearer <access_token>

// ============================================
// EMOTIONAL REGULATION
// ============================================

// 1. ADD ER JOURNAL ENTRY
POST http://localhost:5000/api/er/add
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "feeling": "Anxious",
  "technique": "Deep Breathing",
  "rating_before": 8,
  "rating_after": 4,
  "notes": "5 minutes of box breathing helped reduce anxiety significantly.",
  "duration": 300
}

RESPONSE:
{
  "message": "ER entry added",
  "data": {
    "id": "60d5ec491c9d440000000003",
    "feeling": "Anxious",
    "technique": "Deep Breathing",
    "rating_before": 8,
    "rating_after": 4,
    "notes": "5 minutes of box breathing helped...",
    "duration": 300,
    "ts": 1705316400000
  }
}

// 2. GET ALL ER ENTRIES
GET http://localhost:5000/api/er/all
Authorization: Bearer <access_token>

// 3. DELETE ER ENTRY
DELETE http://localhost:5000/api/er/60d5ec491c9d440000000003
Authorization: Bearer <access_token>

// ============================================
// GAMES
// ============================================

// 1. ADD GAME SCORE
POST http://localhost:5000/api/game/add
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "game_name": "MeditationPuzzle",
  "score": 2500,
  "level": 5
}

RESPONSE:
{
  "message": "Score recorded",
  "data": {
    "id": "60d5ec491c9d440000000004",
    "game_name": "MeditationPuzzle",
    "score": 2500,
    "level": 5,
    "ts": 1705316400000
  }
}

// 2. GET ALL GAME SCORES
GET http://localhost:5000/api/game/all
Authorization: Bearer <access_token>

// 3. GET GAME LEADERBOARD
GET http://localhost:5000/api/game/leaderboard?game=MeditationPuzzle
Authorization: Bearer <access_token>

RESPONSE:
{
  "game": "MeditationPuzzle",
  "scores": [
    {
      "id": "60d5ec491c9d440000000004",
      "game_name": "MeditationPuzzle",
      "score": 2500,
      "level": 5,
      "ts": 1705316400000
    },
    // ... more scores
  ]
}

// ============================================
// USER MANAGEMENT
// ============================================

// 1. GET USER PROFILE
GET http://localhost:5000/api/user/profile
Authorization: Bearer <access_token>

RESPONSE:
{
  "id": 1,
  "username": "sarah_doe",
  "email": "sarah@example.com",
  "full_name": "Sarah Doe",
  "age": 32,
  "gender": "Female",
  "diagnosis_date": null,
  "created_at": "2024-01-15T10:30:00"
}

// 2. UPDATE USER PROFILE
PUT http://localhost:5000/api/user/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "full_name": "Sarah Jane Doe",
  "age": 33,
  "diagnosis_date": "2020-05-15"
}

// 3. CHANGE PASSWORD
POST http://localhost:5000/api/user/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "current_password": "SecurePass123!",
  "new_password": "NewSecurePass456!"
}

// 4. GET USER SUMMARY
GET http://localhost:5000/api/user/summary
Authorization: Bearer <access_token>

RESPONSE:
{
  "user": { ... },
  "total_mood_entries": 15,
  "total_sleep_entries": 8,
  "total_seizure_entries": 3,
  "total_er_entries": 7,
  "total_game_scores": 12
}

// ============================================
// HEALTH CHECK
// ============================================

GET http://localhost:5000/api/health

RESPONSE:
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.123456"
}

// ============================================
// cURL EXAMPLES
// ============================================

// Testing with cURL:

// 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"Pass123"}'

// 2. Login (save the access_token)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"Pass123"}'

// 3. Add Mood (replace TOKEN with your access_token)
curl -X POST http://localhost:5000/api/mood/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"mood":"Happy","emoji":"😊","note":"Great day!"}'

// 4. Get all moods
curl -X GET http://localhost:5000/api/mood/all \
  -H "Authorization: Bearer TOKEN"

// ============================================
// TESTING TOOLS
// ============================================

// Recommended tools for API testing:

// 1. Postman
//    - Download from postman.com
//    - Import collection from API documentation
//    - Easy UI for testing

// 2. Insomnia
//    - Similar to Postman
//    - Open source option

// 3. VS Code REST Client Extension
//    - Create .rest or .http files
//    - Test directly in VS Code

// 4. cURL
//    - Command line tool
//    - Great for scripting

// ============================================
// ERROR RESPONSES
// ============================================

// 401 Unauthorized - Missing or invalid token
{
  "error": "Invalid credentials"
}

// 400 Bad Request - Missing required fields
{
  "error": "Missing username or password"
}

// 404 Not Found - Resource doesn't exist
{
  "error": "Resource not found"
}

// 500 Internal Server Error
{
  "error": "Internal server error"
}

// ============================================
// RESPONSE CODES
// ============================================

// 200 OK - Success
// 201 Created - Resource created
// 400 Bad Request - Invalid input
// 401 Unauthorized - Authentication failed
// 404 Not Found - Resource not found
// 409 Conflict - Duplicate resource (e.g., username exists)
// 500 Internal Server Error - Server error

// ============================================
// AUTHENTICATION
// ============================================

// Store the access_token from login/register response
// Include in all subsequent requests:
// Authorization: Bearer <access_token>

// Token expires after 30 days
// To refresh: POST /api/auth/refresh with current token

// ============================================
