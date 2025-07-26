# 🎬 Movie App - Backend Server (NestJS)

यह movie management application का backend server है जो NestJS framework का उपयोग करता है।

## 📋 Prerequisites

- **Node.js** (version 18 या उससे ऊपर)
- **MongoDB** (local installation या MongoDB Atlas)
- **npm** (version 8 या उससे ऊपर)

## 🚀 Quick Setup

### 1. Dependencies Install करें

```bash
npm install
```

### 2. Environment Variables Setup करें

`.env` file बनाएं project root में:

```env
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
CLOUDINARY_CLOUD_NAME="your-cloud-name-here"
CLOUDINARY_API_KEY="your-api-key-here"
CLOUDINARY_API_SECRET="your-api-secret-here"
```

### 3. MongoDB Setup करें

#### Option A: Local MongoDB
```bash
# MongoDB install करें (MacOS)
brew install mongodb-community

# MongoDB service start करें
brew services start mongodb/brew/mongodb-community

# Or manually start करें
mongod --dbpath ~/data/db
```

#### Option B: MongoDB Atlas (Cloud - FREE)
1. MongoDB Atlas पर जाएं: https://www.mongodb.com/atlas
2. Free cluster बनाएं
3. Connection string copy करें
4. `.env` file में MONGODB_URI update करें

### 4. Cloudinary Setup करें (Image Upload के लिए)

1. Cloudinary पर free account बनाएं: https://cloudinary.com/
2. Dashboard से credentials copy करें:
   - Cloud Name
   - API Key  
   - API Secret
3. `.env` file में values update करें

### 5. Server Start करें

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## 🔧 Available Scripts

```bash
# Development
npm run start:dev          # Development mode with hot reload
npm run start:debug        # Debug mode

# Production
npm run build              # Build project
npm run start:prod         # Start production server

# Testing
npm run test               # Run tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage

# Linting
npm run lint               # Check and fix code style
npm run format             # Format code with Prettier
```

## 📡 API Endpoints

Server चलने के बाद, API documentation यहाँ available होगी:
- **Swagger UI**: http://localhost:3001/api/docs
- **API Base URL**: http://localhost:3001/api

### Main Endpoints:

```
POST   /api/auth/register    # User registration
POST   /api/auth/login       # User login
GET    /api/movies           # Get all movies
POST   /api/movies           # Create new movie
GET    /api/movies/:id       # Get movie by ID
PUT    /api/movies/:id       # Update movie
DELETE /api/movies/:id       # Delete movie
```

## 🏗️ Project Structure

```
src/
├── auth/                   # Authentication module
│   ├── guards/            # JWT guards
│   ├── strategies/        # Passport strategies
│   └── dto/               # Data transfer objects
├── movies/                # Movies module
│   ├── dto/               # Movie DTOs
│   └── movies.service.ts  # Business logic
├── users/                 # Users module
├── schemas/               # MongoDB schemas
├── config/                # Configuration files
├── common/                # Shared utilities
│   ├── filters/           # Exception filters
│   └── interceptors/      # Request interceptors
└── main.ts                # Application entry point
```

## 🔒 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | - | ✅ |
| `JWT_SECRET` | JWT signing secret | - | ✅ |
| `JWT_EXPIRES_IN` | JWT expiration time | 24h | ✅ |
| `PORT` | Server port | 3001 | ✅ |
| `NODE_ENV` | Environment mode | development | ✅ |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | - | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | - | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | - | ✅ |

## 🚨 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**
   ```bash
   # Check if MongoDB is running
   brew services list | grep mongodb
   
   # Start MongoDB if not running
   brew services start mongodb/brew/mongodb-community
   ```

2. **Port Already in Use**
   ```bash
   # Check what's running on port 3001
   lsof -i :3001
   
   # Kill the process
   kill -9 <PID>
   
   # Or change PORT in .env file
   ```

3. **JWT Secret Error**
   - Make sure JWT_SECRET is set in .env file
   - Use a strong, unique secret key

4. **Cloudinary Upload Issues**
   - Verify Cloudinary credentials in .env
   - Check network connectivity
   - Ensure file size is within limits

## 🔗 Frontend Connection

यह backend server frontend application के साथ काम करता है:
- **Frontend Folder**: `../frontend`
- **API Base URL**: `http://localhost:3001/api`
- **CORS**: Configured for `http://localhost:3000`

## 📝 Development Notes

- Server automatically restarts on file changes in development mode
- API documentation is auto-generated using Swagger
- All routes are prefixed with `/api`
- File uploads are handled via Cloudinary
- Authentication uses JWT tokens
- Database uses MongoDB with Mongoose ODM

## 🤝 Contributing

1. Code को properly format करें: `npm run format`
2. Linting errors fix करें: `npm run lint`
3. Tests run करें: `npm run test`
4. Environment variables को properly set करें 