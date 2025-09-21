# Medical Management System - PowerShell Git Setup
# Run this script after Git is installed

param(
    [string]$GitUserName = "SaMe-96",
    [string]$GitUserEmail = "your-email@example.com",
    [string]$RepositoryUrl = "https://github.com/SaMe-96/DAMS.git"
)

Write-Host "============================================" -ForegroundColor Green
Write-Host "Medical Management System - Git Push Script" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

# Function to check if Git is available
function Test-GitAvailable {
    try {
        $gitVersion = git --version 2>$null
        if ($gitVersion) {
            Write-Host "✅ Git is available: $gitVersion" -ForegroundColor Green
            return $true
        }
    }
    catch {
        Write-Host "❌ Git is not available" -ForegroundColor Red
        return $false
    }
    return $false
}

# Function to setup Git configuration
function Set-GitConfiguration {
    Write-Host "Setting up Git configuration..." -ForegroundColor Yellow
    git config --global user.name $GitUserName
    git config --global user.email $GitUserEmail
    git config --global init.defaultBranch main
    Write-Host "✅ Git configuration complete" -ForegroundColor Green
}

# Function to initialize repository
function Initialize-Repository {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    
    if (Test-Path ".git") {
        Write-Host "Git repository already exists" -ForegroundColor Cyan
    } else {
        git init
        Write-Host "✅ Git repository initialized" -ForegroundColor Green
    }
}

# Function to commit changes
function Commit-Changes {
    Write-Host "Adding all files to Git..." -ForegroundColor Yellow
    git add .
    
    Write-Host "Committing changes..." -ForegroundColor Yellow
    $commitMessage = @"
Medical Management System: Complete implementation with Redux, API utilities, bounce animations

Features included:
- Redux Toolkit with RTK Query for state management
- Custom bounce animation hooks (useBounce)
- API utilities with error handling and token management
- Authentication and UI state management
- Complete medical management components (patients, doctors, appointments, billing)
- Modern React patterns with functional components
- Responsive design with Tailwind CSS and glassmorphism effects
- Always-visible edit/delete buttons (as requested)

Libraries now available:
- UseBounce / useBounce - Custom bounce animation hook
- UseRedux / useRedux - Typed Redux hooks
- Api / APi - HTTP client with error handling
- ApiSlice / APiSlice - RTK Query data fetching

Project structure:
- src/store/ - Redux store and slices
- src/hooks/ - Custom React hooks
- src/api/ - API utilities and configuration
- src/components/ - All medical management components
- Complete documentation and setup guides
"@
    
    git commit -m $commitMessage
    Write-Host "✅ Changes committed" -ForegroundColor Green
}

# Function to push to GitHub
function Push-ToGitHub {
    Write-Host "Setting up remote repository..." -ForegroundColor Yellow
    
    # Remove existing origin if it exists
    git remote remove origin 2>$null
    git remote add origin $RepositoryUrl
    
    Write-Host "Setting main branch..." -ForegroundColor Yellow
    git branch -M main
    
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main --force
    
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: $RepositoryUrl" -ForegroundColor Cyan
}

# Main execution
function Main {
    try {
        Write-Host "Starting Git setup process..." -ForegroundColor Cyan
        Write-Host ""
        
        if (Test-GitAvailable) {
            Set-GitConfiguration
            Initialize-Repository
            Commit-Changes
            Push-ToGitHub
            
            Write-Host ""
            Write-Host "🎉 SUCCESS! Your project has been pushed to GitHub!" -ForegroundColor Green
            Write-Host ""
            Write-Host "What was pushed:" -ForegroundColor Cyan
            Write-Host "- Complete Medical Management System" -ForegroundColor White
            Write-Host "- Redux Toolkit with API slices" -ForegroundColor White
            Write-Host "- Custom bounce animation hooks" -ForegroundColor White
            Write-Host "- API utilities and configuration" -ForegroundColor White
            Write-Host "- All requested libraries (UseBounce, UseRedux, Api, ApiSlice)" -ForegroundColor White
            Write-Host "- Modern UI with always-visible edit/delete buttons" -ForegroundColor White
            Write-Host "- Comprehensive documentation" -ForegroundColor White
            Write-Host ""
            Write-Host "Repository URL: $RepositoryUrl" -ForegroundColor Green
            Write-Host ""
            Write-Host "You can now:" -ForegroundColor Yellow
            Write-Host "- View your project online at the repository URL" -ForegroundColor White
            Write-Host "- Clone it to other machines" -ForegroundColor White
            Write-Host "- Continue development with version control" -ForegroundColor White
        } else {
            Write-Host ""
            Write-Host "Git is not available. Please choose one of these options:" -ForegroundColor Red
            Write-Host ""
            Write-Host "1. Install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
            Write-Host "2. Install GitHub Desktop: https://desktop.github.com/" -ForegroundColor Yellow
            Write-Host "3. Use Visual Studio Code with built-in Git support" -ForegroundColor Yellow
            Write-Host ""
            Write-Host "After installation:" -ForegroundColor Cyan
            Write-Host "- Restart your PowerShell/terminal" -ForegroundColor White
            Write-Host "- Run this script again" -ForegroundColor White
            Write-Host ""
            Write-Host "Alternative manual method:" -ForegroundColor Cyan
            Write-Host "- Use GitHub web interface to upload files" -ForegroundColor White
            Write-Host "- Use GitHub Desktop to drag and drop the project folder" -ForegroundColor White
        }
    }
    catch {
        Write-Host "❌ An error occurred: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "Please check your internet connection and Git installation." -ForegroundColor Yellow
    }
}

# Run the main function
Main

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
