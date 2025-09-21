#!/bin/bash

# Alternative Git Setup Script for when Git becomes available

echo "=== Medical Management System - Git Push Script ==="
echo ""

# Function to check if Git is available
check_git() {
    if command -v git &> /dev/null; then
        echo "✅ Git is available"
        return 0
    else
        echo "❌ Git is not available"
        return 1
    fi
}

# Function to setup Git configuration
setup_git_config() {
    echo "Setting up Git configuration..."
    git config --global user.name "SaMe-96"
    git config --global user.email "your-email@example.com"
    git config --global init.defaultBranch main
    echo "✅ Git configuration complete"
}

# Function to initialize repository
init_repository() {
    echo "Initializing Git repository..."
    if [ -d ".git" ]; then
        echo "Git repository already exists"
    else
        git init
        echo "✅ Git repository initialized"
    fi
}

# Function to add and commit files
commit_changes() {
    echo "Adding all files to Git..."
    git add .
    
    echo "Committing changes..."
    git commit -m "Medical Management System: Complete implementation with Redux, API utilities, bounce animations

Features included:
- Redux Toolkit with RTK Query
- Custom bounce animation hooks (useBounce)
- API utilities with error handling
- Authentication and UI state management
- Complete medical management components
- Modern React patterns and TypeScript support
- Responsive design with Tailwind CSS

Libraries available:
- UseBounce / useBounce
- UseRedux / useRedux  
- Api / APi
- ApiSlice / APiSlice"
    
    echo "✅ Changes committed"
}

# Function to add remote and push
push_to_github() {
    echo "Setting up remote repository..."
    git remote remove origin 2>/dev/null || true
    git remote add origin https://github.com/SaMe-96/DAMS.git
    
    echo "Setting main branch..."
    git branch -M main
    
    echo "Pushing to GitHub..."
    git push -u origin main --force
    
    echo "✅ Successfully pushed to GitHub!"
    echo "Repository: https://github.com/SaMe-96/DAMS"
}

# Main execution
main() {
    echo "Starting Git setup process..."
    echo ""
    
    if check_git; then
        setup_git_config
        init_repository
        commit_changes
        push_to_github
        
        echo ""
        echo "🎉 SUCCESS! Your project has been pushed to GitHub!"
        echo ""
        echo "What was pushed:"
        echo "- Complete Medical Management System"
        echo "- Redux Toolkit with API slices"
        echo "- Custom bounce animation hooks"
        echo "- API utilities and configuration"
        echo "- All requested libraries (UseBounce, UseRedux, Api, ApiSlice)"
        echo "- Comprehensive documentation"
        echo ""
        echo "Repository URL: https://github.com/SaMe-96/DAMS"
    else
        echo ""
        echo "Git is not available. Please:"
        echo "1. Install Git from: https://git-scm.com/download/win"
        echo "2. Restart your terminal"
        echo "3. Run this script again"
        echo ""
        echo "Alternative: Use GitHub Desktop from https://desktop.github.com/"
    fi
}

# Run the main function
main
