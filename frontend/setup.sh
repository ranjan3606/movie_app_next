#!/bin/bash

# 🎬 Movie App Frontend - Setup Script
# यह script आपके frontend application को setup करने के लिए है

echo "🎬 Movie App Frontend Setup शुरू हो रहा है..."
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

# Create .env.local file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo ""
    echo "🔧 Environment file (.env.local) बन रही है..."
    
    cat > .env.local << 'EOL'
# Backend API URL - Make sure backend server is running on port 3001
NEXT_PUBLIC_API_URL="http://localhost:3001/api"

# Optional: Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1
EOL

    echo "✅ .env.local file बन गई"
else
    echo "✅ .env.local file already exists"
fi

# Check if backend server is running
echo ""
echo "🔍 Backend server status check हो रही है..."

if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Backend server चल रही है (http://localhost:3001)"
else
    echo "⚠️  Backend server नहीं चल रही। Frontend के लिए backend जरूरी है।"
    echo ""
    echo "🚀 Backend start करने के लिए:"
    echo "   cd ../backend"
    echo "   npm run start:dev"
    echo ""
    echo "📚 Backend setup के लिए ../backend/README.md देखें"
fi

# Check for TypeScript issues
echo ""
echo "🔍 TypeScript configuration check हो रही है..."
if npx tsc --noEmit --skipLibCheck > /dev/null 2>&1; then
    echo "✅ TypeScript configuration ठीक है"
else
    echo "⚠️  TypeScript में कुछ issues हो सकते हैं। Development में fix हो जाएंगे।"
fi

echo ""
echo "================================================"
echo "🎉 Frontend Setup Complete!"
echo "================================================"
echo ""
echo "📝 अगले steps:"
echo ""
echo "1. Backend Server को start करें (जरूरी):"
echo "   cd ../backend"
echo "   npm run start:dev"
echo ""
echo "2. Frontend Development Server start करें:"
echo "   npm run dev"
echo ""
echo "3. Application access करें:"
echo "   http://localhost:3000"
echo ""
echo "4. API documentation देखें (backend running होने पर):"
echo "   http://localhost:3001/api/docs"
echo ""
echo "🔧 Available Commands:"
echo "   npm run dev          # Development server"
echo "   npm run build        # Production build"
echo "   npm run start        # Production server"
echo "   npm run lint         # Code linting"
echo ""
echo "📚 More help के लिए README.md देखें"
echo ""
echo "🚀 Happy Coding!" 