#!/bin/bash

# LB Comms - Deploy to Another Repository Script
# This script overwrites another Git repository with the contents of this one

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  LB Comms - Repository Deployment Script                  ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo ""

# Check if target repository URL is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: No target repository URL provided${NC}"
    echo ""
    echo "Usage:"
    echo "  ./deploy-to-repo.sh <repository-url> [branch]"
    echo ""
    echo "Examples:"
    echo "  ./deploy-to-repo.sh https://github.com/username/repo.git"
    echo "  ./deploy-to-repo.sh https://github.com/username/repo.git main"
    echo "  ./deploy-to-repo.sh git@github.com:username/repo.git"
    echo ""
    exit 1
fi

TARGET_REPO="$1"
TARGET_BRANCH="${2:-master}"  # Default to 'master' if not specified

echo -e "${YELLOW}Configuration:${NC}"
echo "  Target Repository: $TARGET_REPO"
echo "  Target Branch: $TARGET_BRANCH"
echo ""

# Confirm before proceeding
echo -e "${YELLOW}⚠️  WARNING: This will OVERWRITE all content in the target repository!${NC}"
echo -e "${YELLOW}   All files in '$TARGET_BRANCH' branch will be replaced.${NC}"
echo ""
read -p "Are you sure you want to continue? (yes/no): " -r
echo ""

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo -e "${RED}Deployment cancelled.${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Checking current repository status...${NC}"
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}Warning: You have uncommitted changes in this repository.${NC}"
    echo ""
    git status --short
    echo ""
    read -p "Do you want to commit these changes first? (yes/no): " -r
    if [[ $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        echo ""
        read -p "Enter commit message: " COMMIT_MSG
        git add .
        git commit -m "$COMMIT_MSG"
        echo -e "${GREEN}✓ Changes committed${NC}"
    else
        echo -e "${YELLOW}⚠️  Proceeding with uncommitted changes...${NC}"
    fi
else
    echo -e "${GREEN}✓ Working directory is clean${NC}"
fi
echo ""

echo -e "${BLUE}Step 2: Setting up target remote...${NC}"
# Remove existing 'target' remote if it exists
git remote remove target 2>/dev/null || true

# Add target repository as remote
git remote add target "$TARGET_REPO"
echo -e "${GREEN}✓ Target remote added${NC}"
echo ""

echo -e "${BLUE}Step 3: Fetching target repository...${NC}"
if git fetch target; then
    echo -e "${GREEN}✓ Target repository fetched${NC}"
else
    echo -e "${RED}✗ Failed to fetch target repository${NC}"
    echo -e "${RED}  Please check the repository URL and your access permissions${NC}"
    git remote remove target
    exit 1
fi
echo ""

echo -e "${BLUE}Step 4: Pushing to target repository...${NC}"
echo -e "${YELLOW}This will force push to: $TARGET_REPO ($TARGET_BRANCH branch)${NC}"
echo ""

# Determine current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Force push current branch to target
if git push target "$CURRENT_BRANCH:$TARGET_BRANCH" --force; then
    echo ""
    echo -e "${GREEN}✓ Successfully deployed to target repository!${NC}"
else
    echo ""
    echo -e "${RED}✗ Failed to push to target repository${NC}"
    echo -e "${RED}  You may need to check your permissions or authentication${NC}"
    git remote remove target
    exit 1
fi
echo ""

echo -e "${BLUE}Step 5: Cleaning up...${NC}"
git remote remove target
echo -e "${GREEN}✓ Remote cleaned up${NC}"
echo ""

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  Deployment Complete! ✓                                    ║${NC}"
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Verify the deployment at: $TARGET_REPO"
echo "2. If auto-deploy is configured, ensure GitHub secrets are set:"
echo "   - FTP_SERVER"
echo "   - FTP_USERNAME"
echo "   - FTP_PASSWORD"
echo "3. Check the Actions tab in GitHub to monitor deployments"
echo ""
echo -e "${BLUE}Target Repository URL:${NC} $TARGET_REPO"
echo -e "${BLUE}Target Branch:${NC} $TARGET_BRANCH"
echo ""
