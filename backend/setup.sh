#!/bin/bash

# 🎬 Movie App Backend - Setup Script
# यह script आपके backend server को setup करने के लिए है

echo "🎬 Movie App Backend Setup शुरू हो रहा है..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js नहीं मिला। कृपया Node.js 18+ install करें।"
    echo "   Download: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ चाहिए। Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo ""
echo "📦 Dependencies install हो रही हैं..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Dependencies install नहीं हुईं। कृपया manually 'npm install' चलाएं।"
    exit 1
fi

echo "✅ Dependencies successfully install हो गईं"

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo "🔧 Environment file (.env) बन रही है..."
    
    cat > .env << 'EOL'
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
# Sign up at https://cloudinary.com/ and get your credentials
CLOUDINARY_CLOUD_NAME="your-cloud-name-here"
CLOUDINARY_API_KEY="your-api-key-here"
CLOUDINARY_API_SECRET="your-api-secret-here"
EOL

    echo "✅ .env file बन गई। कृपया इसमें अपनी values update करें।"
else
    echo "✅ .env file already exists"
fi

# Check if MongoDB is running (for macOS)
if command -v brew &> /dev/null; then
    echo ""
    echo "🔍 MongoDB status check हो रही है..."
    
    if brew services list | grep -q "mongodb.*started"; then
        echo "✅ MongoDB service चल रही है"
    else
        echo "⚠️  MongoDB service नहीं चल रही। Start करने के लिए:"
        echo "   brew services start mongodb/brew/mongodb-community"
        echo ""
        echo "🚀 MongoDB install करने के लिए (अगर नहीं है):"
        echo "   brew install mongodb-community"
    fi
fi

echo ""
echo "================================================"
echo "🎉 Backend Setup Complete!"
echo "================================================"
echo ""
echo "📝 अगले steps:"
echo ""
echo "1. Environment Variables Setup करें:"
echo "   - .env file में अपनी MongoDB URI डालें"
echo "   - Cloudinary credentials add करें (https://cloudinary.com/)"
echo "   - JWT_SECRET को strong value से replace करें"
echo ""
echo "2. MongoDB को start करें (अगर नहीं चल रहा):"
echo "   brew services start mongodb/brew/mongodb-community"
echo ""
echo "3. Server start करें:"
echo "   npm run start:dev"
echo ""
echo "4. API documentation देखें:"
echo "   http://localhost:3001/api/docs"
echo ""
echo "📚 More help के लिए README.md देखें"
echo ""
echo "🚀 Happy Coding!" 