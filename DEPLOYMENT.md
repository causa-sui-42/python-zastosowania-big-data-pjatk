# 🚀 Deployment Guide

## GitHub Pages Setup

The website is automatically deployed to GitHub Pages on every push to the `main` branch.

**Live URL**: https://causa-sui-42.github.io/python-zastosowania-big-data-pjatk/

## How It Works

1. Push changes to `main` branch (in `website/` directory)
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
   - Installs dependencies
   - Builds the Docusaurus site
   - Deploys to `gh-pages` branch
3. GitHub Pages serves the site from `gh-pages` branch

## Manual Deployment

To manually trigger deployment:
1. Go to **Actions** tab in GitHub
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

## Local Preview

Before pushing, preview your changes locally:

```powershell
cd website
npm install
npm start
```

Open http://localhost:3000/python-zastosowania-big-data-pjatk/

## Build Locally (Production Preview)

```powershell
cd website
npm run build
npm run serve
```

## First-Time Setup Checklist

- [x] GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- [x] Docusaurus config updated with correct URLs
- [ ] Enable GitHub Pages in repository settings:
  - Settings → Pages
  - Source: Deploy from a branch
  - Branch: `gh-pages` / (root)
- [ ] Push changes to main to trigger first deployment
- [ ] Verify site is live at the URL above

## Troubleshooting

### Deployment Failed
- Check the Actions tab for error logs
- Ensure `package-lock.json` exists in `website/`
- Verify Node.js version compatibility (using v20)

### Site Shows 404
- Wait 2-3 minutes after deployment completes
- Clear browser cache (Ctrl + F5)
- Check that `baseUrl` in `docusaurus.config.ts` matches repo name

### Images or CSS Not Loading
- Verify `baseUrl` is correctly set to `/python-zastosowania-big-data-pjatk/`
- All links should be relative or use `baseUrl` prefix
- Check browser console for 404 errors

## Deployment Status

Check deployment status at:
https://github.com/causa-sui-42/python-zastosowania-big-data-pjatk/actions
