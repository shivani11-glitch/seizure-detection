@echo off
REM NeuroGrad Complete Startup Script (Windows)
REM This script starts both backend and frontend servers

echo.
echo ========================================================================
echo.
echo   Welcome to NeuroGrad - Epilepsy Management Application
echo.
echo   Starting up complete application...
echo   Please wait...
echo.
echo ========================================================================
echo.

REM Create a temporary directory for logs if needed
if not exist logs mkdir logs

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from python.org
    pause
    exit /b 1
)

REM Backend Setup
echo [1/4] Setting up backend...
cd backend

if not exist venv (
    echo [1/4] Creating virtual environment...
    python -m venv venv >nul 2>&1
)

call venv\Scripts\activate.bat >nul 2>&1

echo [2/4] Installing dependencies...
pip install -r requirements.txt >nul 2>&1

if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [3/4] Starting backend server...
echo.
echo Starting Flask server on http://localhost:5000
echo.

REM Start backend in a new window
start "NeuroGrad Backend" python app.py

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Frontend Setup
cd ..\frontend

echo [4/4] Starting frontend server...
echo.
echo ========================================================================
echo.
echo   SUCCESS! Application is starting...
echo.
echo   Frontend:  http://localhost:8000/login.html
echo   Backend:   http://localhost:5000/api
echo.
echo   Opening browser...
echo.
echo ========================================================================
echo.

REM Start frontend server
python -m http.server 8000

REM If frontend server closes, prompt before exiting
echo.
echo NeuroGrad has stopped.
pause
