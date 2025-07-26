# Movie Assessment Application

A full-stack movie management application built with Next.js (frontend) and NestJS (backend) with **FREE cloud storage** for images and videos.

## 🎬 Features

### Frontend (Next.js)
- Modern React-based UI with TypeScript
- User authentication with JWT
- Movie listing with pagination
- Create/Edit movie forms with **image and video upload**
- Responsive design with CSS modules

### Backend (NestJS)
- RESTful API with TypeScript
- JWT-based authentication
- MongoDB database with Mongoose ODM
- **FREE file upload support** for movie posters and videos using **Cloudinary**
- Swagger API documentation
- Request validation and error handling
- CORS configuration for frontend integration

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15.4.2
- **Language**: TypeScript
- **Styling**: CSS Modules
- **HTTP Client**: Fetch API

### Backend
- **Framework**: NestJS 10.3.0
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose 8.0.3
- **Authentication**: JWT with Passport
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **File Storage**: **Cloudinary (FREE 25GB + 25GB bandwidth)**

## 💰 Free Cloud Storage

This project uses **Cloudinary** for free file storage:
- ✅ **25GB storage** (free tier)
- ✅ **25GB bandwidth** per month (free tier)
- ✅ **Images and videos** support
- ✅ **Automatic optimization**
- ✅ **CDN included**
- ✅ **No credit card required** for free tier

## 📁 Project Structure

```
movie-assessment/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   └── components/      # Reusable components
│   └── package.json
├── server/                  # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── movies/         # Movies CRUD module
│   │   ├── users/          # Users management module
│   │   ├── config/         # Cloudinary configuration
│   │   └── common/         # Shared utilities
│   └── package.json
└── package.json            # Root package.json for workspace management
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm 8+
- MongoDB database (local or cloud)
- **Cloudinary account** (free signup at https://cloudinary.com/)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-assessment
   ```

2. **Install dependencies for all packages**
   ```bash
   npm run install:all
   ```

3. **Set up Cloudinary (FREE)**
   - Sign up at https://cloudinary.com/ (no credit card required)
   - Get your credentials from the dashboard:
     - Cloud Name
     - API Key
     - API Secret

4. **Set up environment variables**

   **Backend** (`server/.env`):
   ```env
   # MongoDB Database
   MONGODB_URI="mongodb://localhost:27017/movie_assessment"
   
   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-here"
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

   **Frontend** (`frontend/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:3001/api"
   ```

5. **Start MongoDB**
   ```bash
   # Start MongoDB service (if not running)
   mongod --dbpath ~/data/db
   
   # Or if using MongoDB service
   brew services start mongodb/brew/mongodb-community
   ```

6. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend at http://localhost:3000
   - Backend at http://localhost:3001
   - API documentation at http://localhost:3001/api/docs

## 🎯 File Upload Features

### Supported File Types
- **Images**: JPG, JPEG, PNG, GIF
- **Videos**: MP4, AVI, MOV, WMV

### File Size Limits
- **Images**: Up to 5MB
- **Videos**: Up to 50MB

### Free Storage Benefits
- All files stored on Cloudinary's global CDN
- Automatic image/video optimization
- Fast loading from anywhere in the world
- No server storage required

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Movies (Protected routes)
- `GET /api/movies` - Get paginated movies list
- `POST /api/movies` - Create a new movie (with image/video upload)
- `GET /api/movies/:id` - Get movie by ID
- `PATCH /api/movies/:id` - Update movie (with optional image/video upload)
- `DELETE /api/movies/:id` - Delete movie

## 🗃️ Database Schema

### User Model
- `_id`: ObjectId (Primary Key)
- `email`: String (Unique)
- `password`: String (Hashed)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Movie Model
- `_id`: ObjectId (Primary Key)
- `title`: String
- `description`: String (Optional)
- `releaseDate`: DateTime (Optional)
- `rating`: Float (0-10, Optional)
- `imageUrl`: String (Cloudinary URL for image/video, Optional)
- `userId`: ObjectId (Foreign Key)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start both frontend and backend in production mode
- `npm run install:all` - Install dependencies for all packages

### Database Management
- MongoDB runs locally on `mongodb://localhost:27017/movie_assessment`
- Use MongoDB Compass for database GUI
- Collections are automatically created when data is inserted

### Development
- `npm run dev:frontend` - Start only frontend development server
- `npm run dev:backend` - Start only backend development server
- `npm run lint` - Run linting for both frontend and backend

## ✨ Features in Detail

### Authentication
- JWT-based authentication with secure token storage
- Password hashing with bcrypt
- Protected routes with JWT guards
- User registration and login

### Movie Management
- CRUD operations for movies
- **Image and video upload** with Cloudinary
- Pagination support
- Search functionality
- User-specific movie lists

### File Upload
- **Free cloud storage** with Cloudinary
- File validation (type and size)
- **Global CDN delivery**
- Automatic filename generation
- Support for both images and videos

## 🚀 Production Deployment

### Environment Setup
1. Set up MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables for production
3. Set strong JWT secret key
4. Configure CORS for your domain
5. Ensure Cloudinary credentials are set

### Build and Deploy
```bash
# Build both applications
npm run build

# Start production servers
npm run start
```

## 📚 API Documentation

When running in development mode, visit http://localhost:3001/api/docs to view the interactive Swagger API documentation.

## 💡 Alternative Free Storage Options

If you want to explore other free options:

1. **Supabase Storage** (1GB free)
2. **Firebase Storage** (5GB free)
3. **Backblaze B2** (10GB free)
4. **AWS S3** (5GB free for 12 months)

The current setup uses Cloudinary because it offers the most generous free tier with 25GB storage + 25GB bandwidth.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 