import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import validationOptions from './utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.enableCors();
  await app.listen(port);

  console.log(`This service listen on port ${port}`);
}
bootstrap();
