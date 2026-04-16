import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DatabaseExceptionFilter } from 'src/common/filters/database-exception.filter';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //setup global prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix, {
    exclude: ['/api'],
  });

  // exception handlers
  app.useGlobalFilters(new DatabaseExceptionFilter());
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));

  //setup swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Vehicle Booking API')
    .setDescription('This is the API documentation for Vehicle Booking API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
