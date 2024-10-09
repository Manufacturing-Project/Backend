/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',  // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Allows cookies to be sent with requests
  });

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API for Manuffacuring Project')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();

    const document = SwaggerModule.createDocument(app, options);  

    SwaggerModule.setup('api', app, document);


  await app.listen(8080);
}
bootstrap();
 