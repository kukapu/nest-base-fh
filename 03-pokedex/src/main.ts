import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove non-whitelisted properties
      forbidNonWhitelisted: true, // throw an error if non-whitelisted property is present
      transform: true, // transform payload to DTO instance
      transformOptions: {
        enableImplicitConversion: true, // convert types to DTO instance
      }
    })
  )

  app.setGlobalPrefix('/api/v2');

  await app.listen(process.env.PORT );
  console.log(`Application is running on: ${ process.env.PORT }`)
}
bootstrap();
