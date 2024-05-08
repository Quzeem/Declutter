import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties not defined in DTO
      forbidNonWhitelisted: true, // Throws an error for non-whitelisted properties
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = app.get(ConfigService);

  const port = config.get('port');
  await app.listen(port, () => {
    logger.log(
      `Application listening on port ${port} in ${config.get(
        'environment',
      )} mode`,
    );
  });
}
bootstrap();
