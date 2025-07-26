import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    // Log environment information
    logger.log(`Starting application in ${process.env.NODE_ENV || 'development'} mode`);
    logger.log(`Node.js version: ${process.version}`);
    
    // Check critical environment variables
    const port = process.env.PORT || 3001;
    const mongoUri = process.env.MONGODB_URI;
    const jwtSecret = process.env.JWT_SECRET;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    logger.log(`Port: ${port}`);
    logger.log(`Frontend URL: ${frontendUrl}`);
    logger.log(`MongoDB URI: ${mongoUri ? 'Set' : 'Not set (using fallback)'}`);
    logger.log(`JWT Secret: ${jwtSecret ? 'Set' : 'Using default (not recommended for production)'}`);

    const app = await NestFactory.create(AppModule);

    // Global prefix for all routes
    app.setGlobalPrefix('api');

    // Enable CORS for Next.js frontend
    app.enableCors({
      origin: frontendUrl,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    // Swagger API documentation (only in development)
    if (process.env.NODE_ENV !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('Movie Assessment API')
        .setDescription('API for movie management application')
        .setVersion('1.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
          },
          'JWT-auth',
        )
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api/docs', app, document);
      logger.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
    }

    await app.listen(port);
    
    logger.log(`🚀 Application is running on: http://localhost:${port}/api`);
    
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Bootstrap failed:', error);
  process.exit(1);
}); 