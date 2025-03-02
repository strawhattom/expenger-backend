import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
