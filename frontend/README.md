# 🎬 Movie App - Frontend (Next.js)

यह movie management application का frontend client है जो Next.js और React का उपयोग करता है।

## 📋 Prerequisites

- **Node.js** (version 18 या उससे ऊपर)
- **npm** (version 8 या उससे ऊपर)
- **Backend Server** (../backend) running on port 3001

## 🚀 Quick Setup

### 1. Dependencies Install करें

```bash
npm install
```

### 2. Environment Variables Setup करें

`.env.local` file बनाएं project root में:

```env
# Backend API URL
NEXT_PUBLIC_API_URL="http://localhost:3001/api"

# Optional: Disable Next.js telemetry
NEXT_TELEMETRY_DISABLED=1
```

### 3. Backend Server को Start करें

पहले backend server को start करना जरूरी है:

```bash
# Backend directory में जाएं और server start करें
cd ../backend
npm run start:dev
```

### 4. Frontend Development Server Start करें

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Application यहाँ available होगी: **http://localhost:3000**

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Development server start करें
npm run build            # Production build बनाएं
npm run start            # Production server start करें

# Code Quality
npm run lint             # ESLint check करें
npm run lint:fix         # ESLint errors fix करें

# Utilities
npm run clean            # .next folder clean करें
npm run build:clean      # Clean build (removes .next first)
npm run type-check       # TypeScript check करें
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── movies/            # Movies pages
│   │   ├── page.tsx       # Movies list
│   │   ├── create/        # Create movie
│   │   └── edit/[id]/     # Edit movie
│   └── providers.tsx      # Redux provider
├── components/            # Reusable components
│   └── Button/            # Custom button component
├── lib/                   # Utility libraries
│   └── api.ts             # API client
└── store/                 # Redux store
    ├── store.ts           # Store configuration
    ├── hooks.ts           # Typed hooks
    └── slices/            # Redux slices
        └── authSlice.ts   # Authentication state
```

## 🎨 Features

### ✅ Implemented Features:
- **User Authentication** (Login/Register)
- **Movies Management** (CRUD operations)
- **Image Upload** (via Cloudinary)
- **Responsive Design** (Mobile-friendly)
- **State Management** (Redux Toolkit)
- **Type Safety** (TypeScript)
- **Modern UI** (CSS Modules)

### 🔄 User Flow:
1. **Registration/Login** - User account बनाएं या login करें
2. **Movies List** - सभी movies देखें
3. **Create Movie** - नई movie add करें (with image)
4. **Edit Movie** - Existing movie update करें
5. **Delete Movie** - Movie को delete करें

## 🌐 API Integration

Frontend backend API के साथ communicate करता है:

```javascript
// API Base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL; // http://localhost:3001/api

// Main API Endpoints:
POST   /auth/register    # User registration
POST   /auth/login       # User login
GET    /movies           # Get all movies
POST   /movies           # Create new movie
GET    /movies/:id       # Get movie by ID
PUT    /movies/:id       # Update movie
DELETE /movies/:id       # Delete movie
```

## 🔒 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | - | ✅ |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | 1 | ❌ |

## 🎨 Styling

- **CSS Modules** - Component-scoped styles
- **Global CSS** - App-wide styles
- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean and intuitive interface

## 🚨 Troubleshooting

### Common Issues:

1. **API Connection Error**
   ```bash
   # Check if backend server is running
   curl http://localhost:3001/api/health
   
   # Verify API URL in .env.local
   NEXT_PUBLIC_API_URL="http://localhost:3001/api"
   ```

2. **Port Already in Use**
   ```bash
   # Check what's running on port 3000
   lsof -i :3000
   
   # Kill the process
   kill -9 <PID>
   
   # Or run on different port
   npm run dev -- -p 3001
   ```

3. **Build Errors**
   ```bash
   # Clean build cache
   npm run clean
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **TypeScript Errors**
   ```bash
   # Check TypeScript configuration
   npm run type-check
   
   # Fix linting issues
   npm run lint:fix
   ```

## 🔗 Backend Connection

यह frontend application backend server के साथ काम करता है:
- **Backend Folder**: `../backend`
- **Backend URL**: `http://localhost:3001`
- **API Base**: `http://localhost:3001/api`

## 📱 Pages Overview

### 🏠 Home Page (`/`)
- Welcome message
- Navigation to movies

### 🔐 Authentication Pages
- **Login** (`/login`) - User login form
- **Register** (`/register`) - User registration form

### 🎬 Movies Pages
- **Movies List** (`/movies`) - Display all movies
- **Create Movie** (`/movies/create`) - Add new movie form
- **Edit Movie** (`/movies/edit/[id]`) - Edit existing movie

## ⚡ Performance Features

- **Server-Side Rendering** (SSR)
- **Static Generation** where applicable
- **Image Optimization** (Next.js Image component)
- **Code Splitting** (Automatic)
- **Hot Reloading** (Development)

## 🤝 Contributing

1. Code को properly format करें
2. TypeScript errors fix करें: `npm run type-check`
3. Linting errors fix करें: `npm run lint:fix`
4. Components को properly document करें
5. Environment variables को properly set करें

## 📝 Development Notes

- Uses Next.js 15.4.2 with App Router
- State management with Redux Toolkit
- TypeScript for type safety
- CSS Modules for styling
- Responsive design principles
- Modern React patterns (hooks, functional components)

## 🚀 Deployment Ready

यह application production के लिए ready है:
- Environment variables properly configured
- Build optimization enabled
- Error boundaries implemented
- SEO-friendly structure
