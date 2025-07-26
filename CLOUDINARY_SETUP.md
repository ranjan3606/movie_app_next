# 🎬 Cloudinary FREE Storage Setup Guide

## ✅ Status: CONFIGURED & WORKING!

Your Cloudinary integration is **successfully configured** and tested! 🎉

## 📋 Current Configuration

### Environment Variables (server/.env)
```env
CLOUDINARY_CLOUD_NAME=dp5vnblrb
CLOUDINARY_API_KEY=298927916344931
CLOUDINARY_API_SECRET=ReSFHjJgUC1QSnAY4ICzTbWviII
```

### 🔧 What's Configured:

1. **✅ Backend Integration**
   - Cloudinary SDK installed
   - Multer-storage-cloudinary configured
   - File upload endpoints ready
   - Support for images AND videos

2. **✅ Frontend Integration**
   - Drag & drop file upload
   - Preview for images and videos
   - File type validation
   - Size limits configured

3. **✅ File Support**
   - **Images**: JPG, JPEG, PNG, GIF (up to 5MB)
   - **Videos**: MP4, AVI, MOV, WMV (up to 50MB)

## 🎯 How to Use

### 1. Start the Application
```bash
# From project root
npm run dev
```

### 2. Access the App
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Docs**: http://localhost:3001/api/docs

### 3. Upload Files
1. Login/Register in the app
2. Go to "Create Movie"
3. Drag & drop or click to upload images/videos
4. Files will be automatically stored in Cloudinary

## 📊 Free Tier Benefits

### What You Get FREE:
- **25GB Storage** (enough for thousands of images/videos)
- **25GB Bandwidth** per month
- **25,000 Transformations** per month
- **Global CDN** delivery
- **Automatic optimization**
- **No credit card required**

### Usage Examples:
- **Images**: ~5,000 high-quality movie posters (5MB each)
- **Videos**: ~500 movie trailers (50MB each)
- **Mixed**: Thousands of images + hundreds of videos

## 🔍 File Storage Details

### Where Files are Stored:
- **Cloudinary Cloud**: `dp5vnblrb`
- **Folder**: `movies/`
- **URL Format**: `https://res.cloudinary.com/dp5vnblrb/image/upload/v{version}/movies/{filename}`

### Automatic Features:
- **Auto-optimization**: Images compressed automatically
- **Format conversion**: Best format chosen automatically
- **Responsive delivery**: Different sizes for different devices
- **CDN delivery**: Fast loading worldwide

## 🛠️ Technical Implementation

### Backend (NestJS)
```typescript
// File upload configuration
MulterModule.registerAsync({
  useFactory: async (configService: ConfigService) => {
    const cloudinary = createCloudinaryConfig(configService);
    
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'movies',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'avi', 'mov', 'wmv'],
        resource_type: 'auto',
      } as any,
    });

    return {
      storage: storage,
      fileFilter: (req, file, callback) => {
        const allowedTypes = /\.(jpg|jpeg|png|gif|mp4|avi|mov|wmv)$/i;
        if (!file.originalname.match(allowedTypes)) {
          return callback(new Error('Only image and video files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB for videos
      },
    };
  },
})
```

### Frontend (Next.js)
```typescript
// File upload with preview
const handleFileSelect = (file: File) => {
  if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }
};

// Preview component
{selectedFile ? (
  <div className={styles.preview}>
    {selectedFile.type.startsWith('image/') ? (
      <img src={previewUrl} alt="Preview" className={styles.previewImage} />
    ) : (
      <video src={previewUrl} controls className={styles.previewVideo} />
    )}
  </div>
) : (
  // Drop zone
)}
```

## 🚀 API Endpoints

### File Upload Endpoints:
- `POST /api/movies` - Create movie with file upload
- `PATCH /api/movies/:id` - Update movie with file upload

### Request Format:
```bash
# Create movie with image/video
curl -X POST http://localhost:3001/api/movies \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=My Movie" \
  -F "description=Great movie" \
  -F "image=@/path/to/your/file.jpg"
```

## 🎨 File Transformations

Cloudinary automatically provides optimized URLs:

### Original URL:
```
https://res.cloudinary.com/dp5vnblrb/image/upload/v1234567890/movies/movie_poster.jpg
```

### Optimized URLs:
```bash
# Auto-optimized (format + quality)
https://res.cloudinary.com/dp5vnblrb/image/upload/f_auto,q_auto/v1234567890/movies/movie_poster.jpg

# Resized (500x500)
https://res.cloudinary.com/dp5vnblrb/image/upload/w_500,h_500,c_fill/v1234567890/movies/movie_poster.jpg

# Thumbnail (150x150)
https://res.cloudinary.com/dp5vnblrb/image/upload/w_150,h_150,c_thumb/v1234567890/movies/movie_poster.jpg
```

## 📈 Monitoring Usage

### Check Usage:
1. Login to https://cloudinary.com/
2. Go to Dashboard
3. View current usage:
   - Storage used
   - Bandwidth consumed
   - Transformations used

### Upgrade When Needed:
- **Plus Plan**: $89/month (100GB storage, 100GB bandwidth)
- **Advanced Plan**: $224/month (500GB storage, 500GB bandwidth)

## 🔧 Troubleshooting

### Common Issues:

1. **Upload Fails**
   ```bash
   # Check environment variables
   echo $CLOUDINARY_CLOUD_NAME
   echo $CLOUDINARY_API_KEY
   echo $CLOUDINARY_API_SECRET
   ```

2. **Files Not Displaying**
   - Check if URL is accessible
   - Verify Cloudinary dashboard for uploaded files

3. **Large File Upload Fails**
   - Check file size limits (50MB max)
   - Verify internet connection

### Test Connection:
```bash
# Test Cloudinary connection
node -e "
const {v2: cloudinary} = require('cloudinary');
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
cloudinary.api.ping().then(result => console.log('✅ Connected:', result.status)).catch(err => console.log('❌ Error:', err.message));
"
```

## 🎉 Success!

Your movie application now has:
- ✅ FREE cloud storage (25GB)
- ✅ Image & video upload
- ✅ Global CDN delivery
- ✅ Automatic optimization
- ✅ Scalable architecture

**Ready to upload movies with images and videos!** 🎬🚀 