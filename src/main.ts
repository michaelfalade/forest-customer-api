require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log("...");

  const options = new DocumentBuilder()
    .setTitle('FC Customers\' API')
    .setDescription('Customers\'s API')
    .setVersion('1.0')
    .addTag('Forest Capital')
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
    await app.listen(3000);
}

bootstrap();
