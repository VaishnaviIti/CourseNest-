@echo off
echo ========================================
echo   CourseNest LMS - Startup Script
echo ========================================
echo.

REM Check if node_modules exist in backend
if not exist "backend\node_modules\" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Check if node_modules exist in frontend
if not exist "frontend\node_modules\" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo Starting CourseNest...
echo.
echo Backend Server: http://localhost:5000
echo Frontend App:   http://localhost:3000
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Start backend in new window
start "CourseNest Backend" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend in new window
start "CourseNest Frontend" cmd /k "cd frontend && npm run dev"

echo Both servers are starting...
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak > nul

REM Open browser
start http://localhost:3000

echo.
echo ========================================
echo   Servers Running!
echo ========================================
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo To stop: Close the terminal windows
echo ========================================

pause
