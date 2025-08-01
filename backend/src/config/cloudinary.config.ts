import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const createCloudinaryConfig = (configService: ConfigService) => {
  cloudinary.config({
    cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
    api_key: configService.get('CLOUDINARY_API_KEY'),
    api_secret: configService.get('CLOUDINARY_API_SECRET'),
  });
  
  return cloudinary;
};

export { cloudinary }; 