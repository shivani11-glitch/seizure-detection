#!/bin/bash
# NeuroGrad Complete Startup Script (macOS/Linux)
# This script starts both backend and frontend servers

clear

echo ""
echo "========================================================================"
echo ""
echo "   Welcome to NeuroGrad - Epilepsy Management Application"
echo ""
echo "   Starting up complete application..."
echo "   Please wait..."
echo ""
echo "========================================================================"
echo ""

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.8+ from python.org"
    exit 1
fi

# Backend Setup
echo "[1/4] Setting up backend..."
cd "$SCRIPT_DIR/backend"

if [ ! -d "venv" ]; then
    echo "[1/4] Creating virtual environment..."
    python3 -m venv venv >/dev/null 2>&1
fi

source venv/bin/activate >/dev/null 2>&1

echo "[2/4] Installing dependencies..."
pip install -r requirements.txt >/dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo "[3/4] Starting backend server..."
echo ""
echo "Starting Flask server on http://localhost:5000"
echo ""

# Start backend in background
python app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Frontend Setup
cd "$SCRIPT_DIR/frontend"

echo "[4/4] Starting frontend server..."
echo ""
echo "========================================================================"
echo ""
echo "   SUCCESS! Application is starting..."
echo ""
echo "   Frontend:  http://localhost:8000/login.html"
echo "   Backend:   http://localhost:5000/api"
echo ""
echo "   Press Ctrl+C to stop"
echo ""
echo "========================================================================"
echo ""

# Start frontend server in foreground
python3 -m http.server 8000

# Cleanup on exit
echo ""
echo "Stopping NeuroGrad..."
kill $BACKEND_PID 2>/dev/null
wait $BACKEND_PID 2>/dev/null

echo "NeuroGrad has stopped."
