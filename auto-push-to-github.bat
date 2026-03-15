@echo off
REM ============================================
REM Auto-Push CourseNest to GitHub
REM ============================================

echo.
echo ========================================
echo   CourseNest LMS - GitHub Auto-Push
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install from https://git-scm.com/
    pause
    exit /b 1
)

echo Step 1: Creating GitHub Repository
echo ========================================
echo.
echo IMPORTANT: You need to create the repository on GitHub first!
echo.
echo Opening GitHub repository creation page in your browser...
echo.
pause
echo.

REM Open GitHub new repo page
start https://github.com/new

echo.
echo A browser window should open now.
echo.
echo In the GitHub page:
echo   1. Repository name: CourseNest-
echo   2. Description: Full-stack LMS with React, Node.js, MongoDB
echo   3. Choose: Public or Private
echo   4. DO NOT add README, .gitignore, or license
echo   5. Click "Create repository"
echo.
pause
echo.

echo Step 2: Pushing Code to GitHub
echo ========================================
echo.

REM Remove old origin if exists
git remote remove origin 2>nul

REM Get GitHub username
set /p GITHUB_USER="Enter your GitHub username (e.g., VaishnaviIti): "
if "%GITHUB_USER%"=="" (
    echo ERROR: Username cannot be empty
    pause
    exit /b 1
)

echo.
echo Setting up remote for: https://github.com/%GITHUB_USER%/CourseNest-.git
echo.

REM Add remote origin
git remote add origin https://github.com/%GITHUB_USER%/CourseNest-.git

if %errorlevel% neq 0 (
    echo ERROR: Failed to add remote
    echo Make sure you created the repository on GitHub
    pause
    exit /b 1
)

echo Remote added successfully!
echo.

REM Rename branch
git branch -M main

echo.
echo ========================================
echo   Ready to Push!
echo ========================================
echo.
echo When prompted for password, use your Personal Access Token
echo NOT your regular GitHub password.
echo.
echo Get token here: https://github.com/settings/tokens
echo   - Click "Generate new token" -^> "Classic"
echo   - Check "repo" scope
echo   - Copy the token
echo.
pause

echo.
echo Pushing to GitHub...
echo.

REM Push to GitHub
git push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   PUSH FAILED!
    echo ========================================
    echo.
    echo Possible issues:
    echo 1. Repository doesn't exist - Go to https://github.com/new and create it
    echo 2. Wrong credentials - Use Personal Access Token, not password
    echo 3. Network issue - Check internet connection
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
echo https://github.com/%GITHUB_USER%/CourseNest-
echo.
echo Next steps:
echo 1. Star your repository
echo 2. Add screenshots to README.md
echo 3. Share with the world!
echo.
echo Congratulations!
echo.
pause
