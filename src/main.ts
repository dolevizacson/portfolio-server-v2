import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/Interceptors/RouteLogger.interceptor';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, {});

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());

  if (!(process.env.NODE_ENV === 'production')) {
    app.enableCors({ credentials: true, origin: true });
  }

  const configService = app.get(ConfigService);

  app.use(
    cookieParser(
      configService.get<string>('cookieSecret'),
      configService.get<cookieParser.CookieParseOptions>('cookieOptions'),
    ),
  );

  await app.listen(process.env.PORT || 8000);

  logger.log(`app listen on port ${process.env.PORT || 8000}`);
}
bootstrap();
