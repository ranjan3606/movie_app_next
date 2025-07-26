# 🎬 Movie Assessment Application - Setup Guide

यह एक full-stack movie management application है जो Next.js (frontend) और NestJS (backend) का उपयोग करती है।

## 📋 Prerequisites

- **Node.js** (version 18 या उससे ऊपर)
- **MongoDB** (local installation या MongoDB Atlas)
- **Git**

## 🚀 Quick Setup (दोनों servers एक साथ चलाने के लिए)

### Method 1: Automated Setup Script

```bash
# Repository clone करें
git clone <your-repo-url>
cd movie_app_next

# Setup script चलाएं (सब कुछ automatically setup हो जाएगा)
chmod +x setup.sh
./setup.sh

# Development servers start करें (दोनों एक साथ चलेंगे)
chmod +x start-dev.sh
./start-dev.sh
```

### Method 2: Manual Setup

```bash
# 1. Dependencies install करें
npm install                    # Root dependencies
cd frontend && npm install     # Frontend dependencies
cd ../server && npm install    # Backend dependencies
cd ..

# 2. Environment files create करें
# server/.env file बनाएं:
cat > server/.env << 'EOL'
MONGODB_URI="mongodb://localhost:27017/movie_assessment"
JWT_SECRET="your-super-secret-jwt-key-here-change-in-production"
JWT_EXPIRES_IN="24h"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name-here"
CLOUDINARY_API_KEY="your-api-key-here"
CLOUDINARY_API_SECRET="your-api-secret-here"
EOL

# frontend/.env.local file बनाएं:
cat > frontend/.env.local << 'EOL'
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
EOL

# 3. दोनों servers एक साथ start करें
npm run dev
```

## 🔧 Available Scripts

### Root Level Scripts (दोनों servers के लिए)

```bash
# Development mode में दोनों servers चलाएं
npm run dev

# Production build बनाएं
npm run build

# Production mode में दोनों servers चलाएं
npm run start

# सभी dependencies install करें
npm run install:all

# Linting चलाएं
npm run lint
```

### Individual Server Scripts

```bash
# केवल frontend चलाएं
npm run dev:frontend

# केवल backend चलाएं  
npm run dev:backend

# Frontend build करें
npm run build:frontend

# Backend build करें
npm run build:backend
```

## 🌐 Application URLs

जब आप `npm run dev` चलाएंगे, तो:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Documentation**: http://localhost:3001/api/docs

## 📁 Project Structure

```
movie_app_next/
├── frontend/          # Next.js frontend application
├── server/           # NestJS backend application
├── package.json      # Root package.json with workspace configuration
├── setup.sh         # Automated setup script
├── start-dev.sh     # Development startup script
└── README.md        # Project documentation
```

## ⚙️ Environment Configuration

### Backend Environment (server/.env)

```env
# Database
MONGODB_URI="mongodb://localhost:27017/movie_assessment"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-here-change-in-production"
JWT_EXPIRES_IN="24h"

# Server
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"

# File Storage (Cloudinary - FREE)
CLOUDINARY_CLOUD_NAME="your-cloud-name-here"
CLOUDINARY_API_KEY="your-api-key-here"
CLOUDINARY_API_SECRET="your-api-secret-here"
```

### Frontend Environment (frontend/.env.local)

```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
```

## 📦 Features

- **User Authentication** (Register/Login)
- **Movie Management** (CRUD operations)
- **File Upload** (Movie posters via Cloudinary)
- **Responsive UI** (Modern design)
- **API Documentation** (Swagger/OpenAPI)

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** (React framework)
- **TypeScript** (Type safety)
- **Redux Toolkit** (State management)
- **CSS Modules** (Styling)

### Backend
- **NestJS** (Node.js framework)
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **JWT** (Authentication)
- **Cloudinary** (File storage)
- **Swagger** (API documentation)

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Check what's running on ports
   lsof -i :3000  # Frontend port
   lsof -i :3001  # Backend port
   
   # Kill processes if needed
   kill -9 <PID>
   ```

2. **MongoDB connection error**:
   - Make sure MongoDB is running locally
   - Or update `MONGODB_URI` in `server/.env` for remote database

3. **Environment variables not loading**:
   - Make sure `.env` files are in correct locations
   - Restart the servers after making changes

4. **Dependencies issues**:
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules frontend/node_modules server/node_modules
   npm run install:all
   ```

## 🔄 Development Workflow

1. **Start development**: `./start-dev.sh` या `npm run dev`
2. **Make changes**: Code में changes करें
3. **Hot reload**: दोनों servers automatically reload होंगे
4. **Test**: http://localhost:3000 पर test करें
5. **API testing**: http://localhost:3001/api/docs पर API test करें

## 📝 Notes

- यह project **monorepo** structure का उपयोग करता है
- **Concurrently** package से दोनों servers एक साथ चलते हैं
- **Hot reload** enabled है development mode में
- **TypeScript** support है दोनों frontend और backend में

Happy coding! 🚀 