
# Railway Deployment Guide

## Prerequisites
1. Create a Railway account at https://railway.app
2. Install Railway CLI: `npm install -g @railway/cli`

## Environment Variables
Set these environment variables in Railway dashboard:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NODE_ENV`: `production`
- `SESSION_SECRET`: A secure random string

## Deployment Steps

1. **Connect Repository**:
   - Push your code to GitHub
   - Connect your GitHub repository to Railway

2. **Configure Build**:
   - Railway will automatically detect your Node.js app
   - Build command: `npm run build`
   - Start command: `npm start`

3. **Database Setup**:
   - Add PostgreSQL service in Railway
   - Copy the `DATABASE_URL` to your environment variables

4. **Deploy**:
   - Railway will automatically deploy on each push to main branch
   - Your app will be available at the provided Railway URL

## Local Testing for Production
```bash
# Build the application
npm run build

# Start in production mode
npm start
```

## Troubleshooting
- Ensure all environment variables are set
- Check build logs in Railway dashboard
- Verify DATABASE_URL is accessible from Railway
