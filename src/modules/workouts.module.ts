import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/users.controller';
import { UsersService } from 'src/services/users.service';
import { UsersModule } from './users.module';
import { Workout } from 'src/entities/workouts.entity';
import { WorkoutsController } from 'src/controllers/workouts.controller';
import { WorkoutsService } from 'src/services/workouts.service';
import { DecoderService } from 'src/services/decoder.service';


@Module({
    imports: [TypeOrmModule.forFeature([Workout]), UsersModule],
    exports: [TypeOrmModule],
    controllers: [WorkoutsController, UsersController],
    providers: [WorkoutsService, UsersService, DecoderService, JwtService],
})
export class WorkoutsModule {}