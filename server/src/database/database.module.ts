import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        
        // For development, use a simple local connection if Atlas fails
        const fallbackUri = 'mongodb+srv://infowisdomvani:Mbrqp42bMq9Gzpsr@cluster0.sb658f3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        
        return {
          uri: uri || fallbackUri,
          // Add connection options to handle connection failures gracefully
          serverSelectionTimeoutMS: 5000, // 5 seconds timeout
          socketTimeoutMS: 45000,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {} 