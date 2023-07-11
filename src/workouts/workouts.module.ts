import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/users/controllers/users.controller';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from '../users/users.module';
import { Workout } from 'src/workouts/entity/workouts.entity';
import { WorkoutsController } from 'src/workouts/controllers/workouts.controller';
import { WorkoutsService } from 'src/workouts/services/workouts.service';
import { DecoderService } from 'src/decoder.service';
import { savedWorkout } from './entity/savedWorkouts.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Workout, savedWorkout]), UsersModule],
    exports: [TypeOrmModule],
    controllers: [WorkoutsController, UsersController],
    providers: [WorkoutsService, UsersService, DecoderService, JwtService],
})
export class WorkoutsModule {}