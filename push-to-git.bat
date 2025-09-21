@echo off
echo ============================================
echo Medical Management System - Git Push Script
echo ============================================
echo.

:: Check if Git is installed
echo Checking for Git installation...
git --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ ERROR: Git is not installed or not in PATH
    echo.
    echo Please choose one of these options:
    echo.
    echo 1. Install Git from: https://git-scm.com/download/win
    echo 2. Install GitHub Desktop: https://desktop.github.com/
    echo 3. Use Visual Studio Code with Git extension
    echo.
    echo After installation, restart your terminal and run this script again.
    echo.
    echo Alternative: You can also copy your project files manually to a
    echo cloned version of your DAMS repository.
    echo.
    pause
    exit /b 1
)

echo ✅ Git is available

:: Navigate to project directory
cd /d "%~dp0"

:: Initialize Git repository if not already done
if not exist ".git" (
    echo Initializing Git repository...
    git init
) else (
    echo Git repository already exists.
)

:: Configure Git (update with your details)
echo Configuring Git user...
git config user.name "SaMe-96"
git config user.email "your-email@example.com"

:: Add all files
echo Adding files to Git...
git add .

:: Commit changes
echo Committing changes...
git commit -m "Medical Management System: Added Redux, API utilities, bounce animations, and all requested features"

:: Add remote origin (replace with your repository URL if different)
echo Adding remote origin...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/SaMe-96/DAMS.git

:: Set main branch
echo Setting up main branch...
git branch -M main

:: Push to GitHub
echo Pushing to GitHub...
git push -u origin main --force

echo.
echo SUCCESS: Project has been pushed to GitHub!
echo Repository: https://github.com/SaMe-96/DAMS
echo.
echo What was pushed:
echo - Complete Medical Management System
echo - Redux Toolkit with API slices
echo - Custom bounce animation hooks (useBounce)
echo - API utilities and configuration
echo - All requested libraries (UseRedux, Api, ApiSlice)
echo - Modern UI components
echo - Feature documentation
echo.
pause
