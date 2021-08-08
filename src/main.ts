import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: process.env.NODE_ENV !== 'production',
  });
  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT || 8000);
  app.get(Logger).log(`app listen on port ${process.env.PORT || 8000}`, 'Main');
}
bootstrap();
