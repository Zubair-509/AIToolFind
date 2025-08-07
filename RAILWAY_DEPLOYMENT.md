
# Complete Railway Deployment Guide

## Prerequisites
1. Create a Railway account at https://railway.app
2. Push your code to GitHub/GitLab/Bitbucket
3. Install Railway CLI (optional): `npm install -g @railway/cli`

## Step-by-Step Deployment Process

### Step 1: Prepare Your Code
1. Ensure all code is committed and pushed to your repository
2. Verify your app runs locally with `npm run build && npm start`

### Step 2: Create Railway Project
1. Go to https://railway.app and sign in
2. Click "New Project" 
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account if not already connected
5. Select your repository from the list

### Step 3: Configure Build Settings
Railway should auto-detect your Node.js app, but verify these settings:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18+ (Railway auto-detects)

### Step 4: Set Environment Variables
In your Railway project dashboard:
1. Go to "Variables" tab
2. Add these environment variables:
   - `NODE_ENV`: `production`
   - `SESSION_SECRET`: Generate a secure random string (32+ characters)

### Step 5: Deploy
1. Railway will automatically start building and deploying
2. Monitor the build logs in the "Deployments" tab
3. Once deployed, you'll get a Railway URL (e.g., `yourapp.railway.app`)

### Step 6: Custom Domain (Optional)
1. Go to "Settings" > "Domains"
2. Add your custom domain
3. Configure DNS settings as instructed

## Build Process Details
Your app will be built in this order:
1. `npm install` - Install dependencies
2. `npm run build` - Build frontend and backend
3. `npm start` - Start the production server

## Environment Variables Reference
- `NODE_ENV`: Set to `production`
- `PORT`: Automatically provided by Railway
- `SESSION_SECRET`: Your secure session secret

## Troubleshooting Common Issues

### Build Failures
- Check build logs in Railway dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Runtime Crashes
- Check application logs in Railway dashboard
- Ensure environment variables are set correctly
- Verify port binding uses `process.env.PORT`

### Static Files Not Loading
- Ensure build process creates `dist/public` folder
- Check file paths are relative, not absolute

### Database Connections (if added later)
- Use Railway's PostgreSQL add-on
- Connect using the provided `DATABASE_URL`

## Testing Before Deploy
Always test locally first:
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Test production build
NODE_ENV=production npm start
```

## Monitoring Your Deployment
- Use Railway dashboard to monitor logs
- Set up alerts for deployment failures
- Monitor resource usage and scale as needed

## Support
- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check Railway status: https://status.railway.app
