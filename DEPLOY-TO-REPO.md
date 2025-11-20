# Deploy to Another Repository

This script allows you to overwrite another Git repository with the contents of this repository.

## Quick Start

```bash
# Basic usage (deploys to master branch)
./deploy-to-repo.sh https://github.com/username/target-repo.git

# Deploy to specific branch
./deploy-to-repo.sh https://github.com/username/target-repo.git main

# Using SSH
./deploy-to-repo.sh git@github.com:username/target-repo.git
```

## What This Script Does

1. ✅ Checks for uncommitted changes (offers to commit them)
2. ✅ Sets up the target repository as a temporary remote
3. ✅ Fetches the target repository to verify access
4. ✅ Force pushes this repository's content to the target
5. ✅ Cleans up temporary remote
6. ✅ Provides confirmation and next steps

## Safety Features

- **Confirmation prompt** before overwriting
- **Warning** about uncommitted changes
- **Automatic cleanup** of temporary remotes
- **Error handling** with clear messages
- **Color-coded output** for easy reading

## Use Cases

### Scenario 1: Moving to Production Repository
```bash
# Deploy this development repo to production repo
./deploy-to-repo.sh https://github.com/lbcomms/production-site.git main
```

### Scenario 2: Syncing Multiple Repositories
```bash
# Keep a backup repository in sync
./deploy-to-repo.sh https://github.com/username/backup-repo.git
```

### Scenario 3: Migrating to New Repository
```bash
# Move everything to a new repo with different name
./deploy-to-repo.sh https://github.com/username/new-repo-name.git
```

## Requirements

- Git installed and configured
- Write access to target repository
- SSH keys configured (if using SSH URL) or HTTPS credentials

## Authentication

### HTTPS (will prompt for credentials)
```bash
./deploy-to-repo.sh https://github.com/username/repo.git
```

### SSH (uses your SSH keys)
```bash
./deploy-to-repo.sh git@github.com:username/repo.git
```

### GitHub Personal Access Token
If using HTTPS and getting authentication errors:

1. Create a Personal Access Token:
   - GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope

2. Use token in URL:
```bash
./deploy-to-repo.sh https://YOUR_TOKEN@github.com/username/repo.git
```

## Important Notes

⚠️ **This operation is DESTRUCTIVE!**
- The target repository's branch will be completely overwritten
- All files in the target branch will be replaced with this repo's content
- Git history will be rewritten (force push)
- This cannot be easily undone

✅ **Best Practices:**
- Always backup the target repository first
- Test with a dummy repository first
- Verify you have the correct repository URL
- Ensure auto-deploy secrets are configured in the target repo

## Troubleshooting

### Error: "Failed to fetch target repository"
**Solution:**
- Verify the repository URL is correct
- Check you have read access to the repository
- Ensure your SSH keys are configured (if using SSH)

### Error: "Failed to push to target repository"
**Solution:**
- Verify you have write access to the repository
- Check if branch protection rules are blocking the push
- Try authenticating with a personal access token

### Error: "Permission denied (publickey)"
**Solution:**
- Add your SSH key to GitHub: Settings → SSH and GPG keys
- Or use HTTPS URL instead of SSH

### Uncommitted Changes Warning
**Solution:**
- Commit your changes when prompted, or
- Stash them with `git stash` before running the script

## After Deployment

1. **Verify the deployment:**
   ```bash
   git clone <target-repo-url> /tmp/verify
   cd /tmp/verify
   ls -la  # Check all files are present
   ```

2. **Set up auto-deploy** (if not already configured):
   - Go to target repository on GitHub
   - Settings → Secrets and variables → Actions
   - Add: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`

3. **Test the auto-deploy workflow:**
   - Make a small change in target repo
   - Push to master/main branch
   - Check Actions tab for deployment status

## Example Output

```
╔════════════════════════════════════════════════════════════╗
║  LB Comms - Repository Deployment Script                  ║
╔════════════════════════════════════════════════════════════╗

Configuration:
  Target Repository: https://github.com/username/target.git
  Target Branch: main

⚠️  WARNING: This will OVERWRITE all content in the target repository!
   All files in 'main' branch will be replaced.

Are you sure you want to continue? (yes/no): yes

Step 1: Checking current repository status...
✓ Working directory is clean

Step 2: Setting up target remote...
✓ Target remote added

Step 3: Fetching target repository...
✓ Target repository fetched

Step 4: Pushing to target repository...
✓ Successfully deployed to target repository!

Step 5: Cleaning up...
✓ Remote cleaned up

╔════════════════════════════════════════════════════════════╗
║  Deployment Complete! ✓                                    ║
╔════════════════════════════════════════════════════════════╗
```

## Script Location

The script is located at: `./deploy-to-repo.sh`

Make it executable: `chmod +x deploy-to-repo.sh`

---

**Need help?** Check [DEPLOYMENT.md](DEPLOYMENT.md) for auto-deploy setup instructions.
