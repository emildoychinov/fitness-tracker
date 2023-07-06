import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}