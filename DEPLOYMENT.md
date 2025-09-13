# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 2. Repository Permissions
The workflow now includes proper permissions, but you may need to:

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**
4. Save changes

### 3. Deploy
1. Push your code to the `main` branch
2. The GitHub Action will automatically build and deploy
3. Your site will be available at: `https://jamesmorgan.github.io/nft-coa/`

## Troubleshooting

### Permission Denied Error
If you still get permission errors:
1. Make sure GitHub Pages is enabled with **GitHub Actions** as source
2. Check that the repository has **Actions** enabled
3. Verify the workflow permissions are set correctly

### Build Failures
- Check the **Actions** tab for detailed error logs
- Ensure all dependencies are properly installed
- Verify the build command works locally: `npm run build`

## Manual Deployment (Alternative)
If GitHub Actions continues to have issues, you can deploy manually:

1. Run `npm run build` locally
2. Copy the contents of the `docs/` folder
3. Create a new branch called `gh-pages`
4. Upload the files to the root of the `gh-pages` branch
5. Set GitHub Pages source to **Deploy from a branch** → **gh-pages**

## Environment Variables (Optional)
For better RPC performance, you can add environment variables in GitHub:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets:
   - `VITE_INFURA_API_KEY`: Your Infura API key
   - `VITE_ALCHEMY_API_KEY`: Your Alchemy API key

These will be automatically used by the build process.
