import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UserHttpModule {}
