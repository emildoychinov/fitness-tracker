import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common'
import * as express from 'express'
import { join } from 'path';


const expressApp = require('express')();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(5000);
}
bootstrap();
