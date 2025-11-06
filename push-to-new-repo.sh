#!/bin/bash

# Script to push project to a new repository
# Usage: ./push-to-new-repo.sh <new-repo-url>

if [ -z "$1" ]; then
    echo "Error: Please provide the new repository URL"
    echo "Usage: ./push-to-new-repo.sh <new-repo-url>"
    echo "Example: ./push-to-new-repo.sh https://github.com/yourusername/new-repo.git"
    exit 1
fi

NEW_REPO_URL=$1

echo "=========================================="
echo "Pushing to New Repository"
echo "=========================================="
echo "New Repository: $NEW_REPO_URL"
echo ""

# Stage all changes
echo "1. Staging all changes..."
git add .

# Commit changes
echo "2. Committing changes..."
git commit -m "Complete MASI Prediction Platform with ML Integration"

# Add new remote
echo "3. Adding new remote repository..."
git remote add new-origin $NEW_REPO_URL

# Push to new repository
echo "4. Pushing to new repository..."
git push -u new-origin main

echo ""
echo "=========================================="
echo "✅ Successfully pushed to new repository!"
echo "=========================================="
echo "New repository URL: $NEW_REPO_URL"
echo ""
echo "To make this the default remote, run:"
echo "  git remote remove origin"
echo "  git remote rename new-origin origin"
