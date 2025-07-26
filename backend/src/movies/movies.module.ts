import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie, MovieSchema } from '../schemas/movie.schema';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { createCloudinaryConfig } from '../config/cloudinary.config';
import { extname } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const cloudinary = createCloudinaryConfig(configService);
        
        const storage = new CloudinaryStorage({
          cloudinary: cloudinary,
          params: {
            folder: 'movies',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'avi', 'mov', 'wmv'],
            resource_type: 'auto', // Automatically detect if it's image or video
          } as any,
        });

        return {
          storage: storage,
          fileFilter: (req, file, callback) => {
            // Allow both images and videos
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
      inject: [ConfigService],
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {} 