import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { HomeController } from './home.controller';

@Module({
  imports: [],
  controllers: [AppController, HomeController],
  providers: [AppService],
})
export class AppModule {}
