import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { UsersController } from '../users/controllers/users.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UserHttpModule {}
