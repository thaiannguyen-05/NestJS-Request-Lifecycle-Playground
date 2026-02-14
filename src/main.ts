import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
    apply global pipe
  */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remote any type is not of in dto
      forbidNonWhitelisted: true, // throw error if type is not in dto
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
