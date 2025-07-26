#!/bin/bash

# Movie Assessment Application Setup Script

echo "🎬 Setting up Movie Assessment Application..."
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
cd ..

# Create environment files if they don't exist
echo "⚙️  Setting up environment files..."

if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env file..."
    cat > server/.env << EOL
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
    echo "✅ MongoDB and Cloudinary configured for local development"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "📝 Creating frontend/.env.local file..."
    cat > frontend/.env.local << EOL
# Backend API URL
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
EOL
fi

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p server/uploads

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "⚠️  IMPORTANT: Set up Cloudinary for FREE file storage:"
echo "1. Sign up at https://cloudinary.com/ (no credit card required)"
echo "2. Get your credentials from dashboard and update server/.env file"
echo "3. You get 25GB storage + 25GB bandwidth FREE!"
echo ""
echo "Next steps:"
echo "1. Update server/.env with your Cloudinary credentials"
echo "2. Start MongoDB service: mongod --dbpath ~/data/db"
echo "3. Start the development servers: npm run dev"
echo ""
echo "MongoDB will automatically create collections when needed!"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:3001/api"
echo "- API Documentation: http://localhost:3001/api/docs"
echo ""
echo "Happy coding! 🚀" 