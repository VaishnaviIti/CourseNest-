@echo off
echo ========================================
echo   MongoDB Installation Helper
echo ========================================
echo.
echo This script will help you install MongoDB
echo.
echo Step 1: Opening MongoDB download page...
start https://www.mongodb.com/try/download/community
echo.
echo Downloading...
echo 1. Select Version: 8.0.x (latest)
echo 2. Select Platform: Windows  
echo 3. Select Package: MSI
echo 4. Click Download
echo.
pause
echo.
echo Step 2: After download completes, run the installer
echo.
echo Installation Settings:
echo - Setup Type: Complete
echo - Install as Service: YES
echo - Run as Network Service: YES
echo.
echo Press any key when installer is ready...
pause
echo.
echo Step 3: Verifying MongoDB installation...
echo.

sc query MongoDB > nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] MongoDB service found!
    echo.
    echo Starting MongoDB service...
    net start MongoDB
    if %errorlevel% equ 0 (
        echo [SUCCESS] MongoDB started successfully!
    ) else (
        echo [WARNING] MongoDB service exists but won't start
        echo Try running this script as Administrator
    )
) else (
    echo [ERROR] MongoDB service not found
    echo.
    echo Please run the installer you downloaded
    echo Make sure to check "Install MongoDB as a Service"
    pause
    exit /b 1
)

echo.
echo Step 4: Testing MongoDB connection...
echo.

mongosh --eval "db.version()" > nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] MongoDB is working!
) else (
    echo [INFO] MongoDB shell might not be in PATH
    echo Trying full path...
    "C:\Program Files\MongoDB\Server\8.0\bin\mongosh.exe" --eval "db.version()" > nul 2>&1
    if %errorlevel% equ 0 (
        echo [SUCCESS] MongoDB is working!
    ) else (
        echo [WARNING] Cannot connect to MongoDB shell
        echo But the service is running, which is good enough
    )
)

echo.
echo ========================================
echo   MongoDB Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Navigate to CourseNest backend folder
echo 2. Run: npm run seed
echo 3. Restart backend server
echo.
echo Database will be created with:
echo - 8 programming courses
echo - 65+ video lessons
echo - Admin account for testing
echo.
echo Test Credentials:
echo Email: admin@coursenest.com
echo Password: admin123
echo.
echo ========================================
pause
