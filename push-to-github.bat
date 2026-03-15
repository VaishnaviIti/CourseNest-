@echo off
REM ============================================
REM CourseNest LMS - Push to GitHub Script
REM ============================================

echo.
echo ========================================
echo   CourseNest LMS - GitHub Push Tool
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo Git is installed! Good.
echo.

REM Ask user for GitHub username
set /p GITHUB_USERNAME="Enter your GitHub username: "
if "%GITHUB_USERNAME%"=="" (
    echo ERROR: You must enter your GitHub username
    pause
    exit /b 1
)

echo.
echo Great! Your GitHub username is: %GITHUB_USERNAME%
echo.
echo Next, we'll add the remote repository...
echo.

REM Add remote origin
git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USERNAME%/coursenest-lms.git

if %errorlevel% neq 0 (
    echo ERROR: Failed to add remote origin
    echo Make sure you created the repository on GitHub first
    echo Visit: https://github.com/new
    echo Repository name: coursenest-lms
    pause
    exit /b 1
)

echo Remote origin added successfully!
echo.

REM Rename branch to main
echo Renaming branch to main...
git branch -M main

echo.
echo ========================================
echo   Ready to Push to GitHub!
echo ========================================
echo.
echo Repository URL: https://github.com/%GITHUB_USERNAME%/coursenest-lms
echo.
echo IMPORTANT: When prompted for password, use your Personal Access Token
echo NOT your regular GitHub password.
echo.
echo To get a Personal Access Token:
echo 1. Go to: https://github.com/settings/tokens
echo 2. Click "Generate new token" -^> "Classic"
echo 3. Give it a name (e.g., "CourseNest Push")
echo 4. Check the "repo" scope
echo 5. Click "Generate token"
echo 6. Copy the token (save it somewhere safe!)
echo 7. Use this token as your password when pushing
echo.
echo ========================================
echo.

REM Ask if ready to push
set /p READY="Are you ready to push? (y/n): "
if /i not "%READY%"=="y" (
    echo.
    echo No problem! You can push manually later with:
    echo   git push -u origin main
    echo.
    pause
    exit /b 0
)

echo.
echo Pushing to GitHub...
echo (Enter your GitHub username and Personal Access Token when prompted)
echo.

REM Push to GitHub
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Push failed!
    echo.
    echo Common issues:
    echo 1. Repository doesn't exist on GitHub - Create it at https://github.com/new
    echo 2. Wrong credentials - Use Personal Access Token, not password
    echo 3. Network issue - Check your internet connection
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! Repository pushed!
echo ========================================
echo.
echo Your CourseNest LMS is now live at:
echo https://github.com/%GITHUB_USERNAME%/coursenest-lms
echo.
echo Next steps:
echo 1. Star your repository
echo 2. Add screenshots to README.md
echo 3. Share with the world!
echo.
echo Congratulations!
echo.
pause
