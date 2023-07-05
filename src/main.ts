import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express'
import { join } from 'path';


const expressApp = require('express')();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), { cors: true });
  app.use(express.static(join(__dirname, '..', '..', 'fitness-tracker-frontend', 'build')));
  await app.listen(5000);
}
bootstrap();
