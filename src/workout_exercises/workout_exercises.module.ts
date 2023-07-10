import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsController } from 'src/workouts/controllers/workouts.controller';
import { WorkoutsService } from 'src/workouts/services/workouts.service';
import { Workout_exercise } from 'src/workout_exercises/common/entities/workout_exercises.entity';
import { ExercisesModule } from '../exercises/exercises.module';
import { ExercisesController } from 'src/exercises/controllers/exercises.controller';
import { ExercisesService } from 'src/exercises/services/exercises.service';
import { WorkoutExercisesController } from 'src/workout_exercises/controllers/workout_exercises.controller';
import { WorkoutExercisesService } from 'src/workout_exercises/services/workout_exercises.service';
import { WorkoutsModule } from '../workouts/workouts.module';
import { DecoderService } from 'src/decoder.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/common/entity/users.entity';


@Module({
    imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Workout_exercise]), ExercisesModule, WorkoutsModule],
    exports: [TypeOrmModule],
    controllers: [WorkoutExercisesController, WorkoutsController, ExercisesController],
    providers: [DecoderService, WorkoutExercisesService, WorkoutsService, ExercisesService, JwtService],
})
export class WorkoutExerciseModule {}