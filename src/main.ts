import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import * as fastify from 'fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter(fastify()));

  const apiPrefix = 'api';

  app.setGlobalPrefix(apiPrefix);

  await app.listen(3000);
}

bootstrap();
