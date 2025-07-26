# 🎬 Movie Management Application

यह एक complete movie management system है जो **clean separated architecture** में बना है।

## 📁 Clean Project Structure

```
movie_app_next/
├── backend/                    # 🔧 NestJS Backend Server
│   ├── src/                   # Source code
│   ├── package.json           # Backend dependencies
│   ├── README.md              # Backend setup guide
│   └── setup.sh               # Backend setup script
│
├── frontend/                   # 🎨 Next.js Frontend App
│   ├── src/                   # Source code
│   ├── package.json           # Frontend dependencies
│   ├── README.md              # Frontend setup guide
│   └── setup.sh               # Frontend setup script
│
└── README.md                  # This overview file
```

## 🚀 Quick Start

### Option 1: Individual Setup (Recommended)

```bash
# Backend setup (Terminal 1)
cd backend
chmod +x setup.sh
./setup.sh
npm run start:dev

# Frontend setup (Terminal 2)
cd frontend
chmod +x setup.sh
./setup.sh
npm run dev
```

### Option 2: Manual Setup

```bash
# Backend
cd backend
npm install
# Create .env file (see backend/README.md)
npm run start:dev

# Frontend (new terminal)
cd frontend
npm install
# Create .env.local file (see frontend/README.md)
npm run dev
```

## 🎯 Applications

### 🔧 Backend Server (NestJS)
- **Port**: 3001
- **API Docs**: http://localhost:3001/api/docs
- **Technology**: NestJS, MongoDB, JWT, Cloudinary
- **Setup Guide**: `backend/README.md`

### 🎨 Frontend Application (Next.js)
- **Port**: 3000
- **URL**: http://localhost:3000
- **Technology**: Next.js, React, Redux Toolkit, TypeScript
- **Setup Guide**: `frontend/README.md`

## 📋 Prerequisites

### System Requirements:
- **Node.js** 18+ और npm 8+
- **MongoDB** (local या Atlas)
- **Git**

### External Services:
- **Cloudinary Account** (free) - Image upload के लिए
- **MongoDB Atlas** (optional) - Cloud database के लिए

## 🌟 Features

### 🔐 Authentication System
- User registration और login
- JWT-based authentication
- Protected routes
- Session persistence

### 🎬 Movie Management
- Movies list view
- Create new movies
- Edit existing movies
- Delete movies
- Image upload (Cloudinary)

### 🎨 Modern UI/UX
- Responsive design
- Real-time form validation
- Loading states
- Error handling
- Clean, intuitive interface

## 🔄 Development Workflow

### 1. Start Backend Server
```bash
cd backend
npm run start:dev
# Server runs on http://localhost:3001
```

### 2. Start Frontend App
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

### 3. Development URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Documentation**: http://localhost:3001/api/docs

## 🚨 Common Issues & Solutions

### Backend Issues:

1. **MongoDB Connection Error**
   ```bash
   # Check MongoDB status
   brew services list | grep mongodb
   
   # Start MongoDB
   brew services start mongodb/brew/mongodb-community
   ```

2. **Port 3001 Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :3001
   
   # Kill the process
   kill -9 <PID>
   ```

### Frontend Issues:

1. **API Connection Error**
   ```bash
   # Verify backend is running
   curl http://localhost:3001/api/health
   
   # Check .env.local file
   NEXT_PUBLIC_API_URL="http://localhost:3001/api"
   ```

2. **Port 3000 Already in Use**
   ```bash
   # Run on different port
   npm run dev -- -p 3001
   ```

## 📚 Documentation

### Detailed Setup Guides:
- **Backend**: `backend/README.md`
- **Frontend**: `frontend/README.md`

### API Documentation:
- **Swagger UI**: http://localhost:3001/api/docs (when backend is running)

## 🔒 Environment Variables

### Backend (.env):
```env
MONGODB_URI="mongodb://localhost:27017/movie_assessment"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Frontend (.env.local):
```env
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
NEXT_TELEMETRY_DISABLED=1
```

## 🚀 Production Deployment

### Backend Deployment:
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend Deployment:
```bash
cd frontend
npm run build
npm start
```

## 🤝 Contributing

1. **Code Style**: ESLint और Prettier का उपयोग करें
2. **Testing**: Tests लिखें और run करें
3. **Documentation**: Changes को document करें
4. **Environment**: Proper environment variables set करें

## 📝 Architecture Benefits

### 🎯 Clean Separation:
- **Independent Development**: Frontend और backend teams अलग काम कर सकते हैं
- **Technology Flexibility**: अलग-अलग technologies का उपयोग
- **Clear Boundaries**: Well-defined responsibilities

### 🔄 Development Benefits:
- **Faster Development**: Parallel development possible
- **Better Testing**: Isolated unit testing
- **Easier Maintenance**: Clear structure और organization

### 🚀 Deployment Benefits:
- **Independent Deployment**: अलग-अलग deploy कर सकते हैं
- **Resource Optimization**: Different resource allocation
- **Scalability**: Individual scaling possible

## 📞 Support

अगर कोई issue आए तो:
1. Individual folder के README देखें
2. Setup scripts run करें
3. Common issues section check करें
4. Environment variables verify करें

## 🎉 Success Indicators

Setup successful है अगर:
- ✅ Backend server http://localhost:3001 पर चल रही है
- ✅ Frontend app http://localhost:3000 पर accessible है
- ✅ API documentation http://localhost:3001/api/docs पर available है
- ✅ User registration/login काम कर रहा है
- ✅ Movies CRUD operations work कर रहे हैं

**Happy Coding! 🚀** 