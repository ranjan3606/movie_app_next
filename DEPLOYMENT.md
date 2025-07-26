# Production Deployment Guide

## Environment Variables

The following environment variables need to be set in your production environment:

### Required Variables

```bash
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend URL for CORS
FRONTEND_URL=https://your-frontend-domain.com
```

### Optional Variables

```bash
# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Deployment Steps

### 1. Build the Application

```bash
# Install dependencies
npm run install:all

# Build both frontend and backend
npm run build
```

### 2. Set Environment Variables

For **Render.com** or similar platforms:
- Go to your service settings
- Add the environment variables listed above
- Make sure `NODE_ENV=production`

For **manual deployment**:
- Create a `.env` file in the `server` directory with the variables above
- Or export them in your shell before starting the application

### 3. Start the Application

```bash
# For production (builds and starts both frontend and backend)
npm run start:prod

# Or start services individually
npm run start:frontend  # Starts Next.js frontend
npm run start:backend   # Starts NestJS backend
```

## Troubleshooting

### Common Issues

#### 1. "node dist/main" fails
- **Cause**: Server not built or environment variables missing
- **Solution**: 
  ```bash
  cd server
  npm run build
  npm run start:prod
  ```

#### 2. Database connection fails
- **Cause**: Invalid `MONGODB_URI` or network issues
- **Solution**: 
  - Verify MongoDB Atlas connection string
  - Check IP whitelist in MongoDB Atlas
  - Ensure database user has proper permissions

#### 3. JWT authentication issues
- **Cause**: Missing or invalid `JWT_SECRET`
- **Solution**: Set a strong `JWT_SECRET` environment variable

#### 4. CORS errors
- **Cause**: Incorrect `FRONTEND_URL` setting
- **Solution**: Set `FRONTEND_URL` to your actual frontend domain

### Checking Server Status

```bash
# Test if server is responding
curl http://localhost:3001/api/auth/login

# Check server logs for detailed error information
# The updated server now provides detailed startup logging
```

### Production Checklist

- [ ] All environment variables are set
- [ ] MongoDB Atlas is configured and accessible
- [ ] JWT_SECRET is set to a secure value
- [ ] FRONTEND_URL matches your actual frontend domain
- [ ] Both frontend and backend are built
- [ ] Server responds to health checks

## Platform-Specific Notes

### Render.com
- Set build command: `npm run build`
- Set start command: `npm run start:prod`
- Add all environment variables in the dashboard
- Ensure your MongoDB Atlas allows connections from Render's IP ranges

### Vercel (Frontend only)
- Deploy frontend separately
- Set `NEXT_PUBLIC_API_URL` to your backend URL
- Build command: `npm run build`
- Output directory: `.next`

### Railway/Heroku
- Set build command: `npm run build`
- Set start command: `npm run start:prod`
- Configure environment variables through their CLI or dashboard

## Monitoring

The server now includes detailed logging for:
- Environment configuration
- Database connection status
- JWT configuration
- CORS settings
- Startup errors

Check the logs for any issues during deployment. 