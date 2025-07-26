#!/bin/bash

echo "🎬 Starting Movie Assessment Application..."
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

# Create environment files if they don't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env file..."
    cat > server/.env << 'EOL'
# MongoDB Database
MONGODB_URI="mongodb://localhost:27017/movie_assessment"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here-change-in-production"
JWT_EXPIRES_IN="24h"

# Server Configuration
PORT=3001
NODE_ENV="development"

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"

# Cloudinary Configuration (FREE - 25GB storage + 25GB bandwidth)
# Sign up at: https://cloudinary.com/ (no credit card required)
CLOUDINARY_CLOUD_NAME="your-cloud-name-here"
CLOUDINARY_API_KEY="your-api-key-here"
CLOUDINARY_API_SECRET="your-api-secret-here"
EOL
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "📝 Creating frontend/.env.local file..."
    cat > frontend/.env.local << 'EOL'
# Backend API URL
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
EOL
fi

# Create uploads directory
mkdir -p server/uploads

echo ""
echo "🚀 Starting both servers..."
echo "- Frontend will be available at: http://localhost:3000"
echo "- Backend API will be available at: http://localhost:3001/api"
echo "- API Documentation will be available at: http://localhost:3001/api/docs"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers using concurrently
npm run dev 