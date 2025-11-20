# Deployment Guide

## Auto-Deploy Setup (GitHub Actions → cPanel)

### Prerequisites
- GitHub repository set up
- cPanel FTP/SFTP credentials
- GitHub repository admin access

### Setup Instructions

#### 1. Get Your cPanel FTP Credentials

From cPanel:
1. Log into your cPanel account
2. Go to **Files** → **FTP Accounts**
3. Note your FTP server address (usually `ftp.yourdomain.com` or your domain IP)
4. Create or use existing FTP account with access to `public_html/`

#### 2. Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these three secrets:

**Secret 1: `FTP_SERVER`**
- Name: `FTP_SERVER`
- Value: `ftp.yourdomain.com` (or your FTP server address)

**Secret 2: `FTP_USERNAME`**
- Name: `FTP_USERNAME`
- Value: Your FTP username (e.g., `user@yourdomain.com`)

**Secret 3: `FTP_PASSWORD`**
- Name: `FTP_PASSWORD`
- Value: Your FTP password

#### 3. How It Works

Once secrets are added:

1. **Automatic deployment**: Every time you push to the `master` branch, GitHub Actions will:
   - Install dependencies
   - Build the project (`npm run build`)
   - Deploy the `dist/` folder to your cPanel `public_html/`

2. **Manual deployment**: You can also trigger deployment manually:
   - Go to **Actions** tab in GitHub
   - Select **Deploy to cPanel** workflow
   - Click **Run workflow**

#### 4. First Deployment

```bash
git add .
git commit -m "Add auto-deploy workflow"
git push origin master
```

Watch the deployment in the **Actions** tab of your GitHub repository.

### Troubleshooting

**Issue: FTP connection fails**
- Verify FTP server address in secrets
- Check if your cPanel allows FTP connections (some hosts require FTPS/SFTP)
- Ensure firewall allows FTP port 21

**Issue: Files not uploading**
- Check `server-dir` path in workflow file (should be `/public_html/` or `/`)
- Verify FTP user has write permissions

**Issue: Build fails**
- Check Node.js version compatibility
- Ensure `package.json` has all dependencies listed

### Alternative: SFTP (More Secure)

If your host supports SFTP instead of FTP:

```yaml
- name: Deploy to cPanel via SFTP
  uses: wlixcc/SFTP-Deploy-Action@v1.2.4
  with:
    server: ${{ secrets.SFTP_SERVER }}
    username: ${{ secrets.SFTP_USERNAME }}
    password: ${{ secrets.SFTP_PASSWORD }}
    port: 22
    local_path: './dist/*'
    remote_path: '/public_html'
    sftp_only: true
```

Add `SFTP_SERVER`, `SFTP_USERNAME`, `SFTP_PASSWORD` secrets accordingly.

## Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# Upload contents of dist/ folder to cPanel public_html/
# Use cPanel File Manager or FTP client like FileZilla
```

## Deployment Checklist

- [ ] Set up GitHub secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)
- [ ] Test workflow runs successfully
- [ ] Verify files appear in cPanel public_html/
- [ ] Check website loads correctly
- [ ] Test all functionality (forms, links, responsive design)
- [ ] Clear browser cache if seeing old version

## Production URL
Your site will be live at: **https://yourdomain.com**

---

**Note**: Always test in development (`npm run dev`) before pushing to master!
