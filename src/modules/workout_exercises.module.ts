import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsController } from 'src/controllers/workouts.controller';
import { WorkoutsService } from 'src/services/workouts.service';
import { Workout_exercise } from 'src/entities/workout_exercises.entity';
import { ExercisesModule } from './exercises.module';
import { ExercisesController } from 'src/controllers/exercises.controller';
import { ExercisesService } from 'src/services/exercises.service';
import { WorkoutExercisesController } from 'src/controllers/workout_exercises.controller';
import { WorkoutExercisesService } from 'src/services/workout_exercises.service';
import { WorkoutsModule } from './workouts.module';
import { DecoderService } from 'src/services/decoder.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/users.entity';


@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Workout_exercise]), ExercisesModule, WorkoutsModule],
    exports: [TypeOrmModule],
    controllers: [WorkoutExercisesController, WorkoutsController, ExercisesController],
    providers: [DecoderService, WorkoutExercisesService, WorkoutsService, ExercisesService, JwtService],
})
export class WorkoutExerciseModule {}