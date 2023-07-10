import { Body, Controller, Get, Inject, Post, Req, Delete } from '@nestjs/common';
import { Workout_exercisesDto } from 'src/workout_exercises/common/dto/workout_exercises.dto';
import { WorkoutExercisesService } from 'src/workout_exercises/services/workout_exercises.service';
import { Workout_exercise } from '../common/entities/workout_exercises.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('workout_exercise')
export class WorkoutExercisesController {
    @Inject(WorkoutExercisesService)
    private readonly service: WorkoutExercisesService;
    @InjectRepository(Workout_exercise)
    private workoutsExerciseRepository: Repository<Workout_exercise>;

    @Post('test')
    async createWorkoutExercise(@Body() body: Workout_exercisesDto) {

        var res = await this.service.createWorkout_exercise(body);
        return res;
    }


    @Delete(':id')
    async deleteWorkout(@Body() body: Workout_exercisesDto) {
        const { exercise_id }: Workout_exercisesDto = body;

        let workout_exercise: Workout_exercise = await this.workoutsExerciseRepository.findOne({ where: { id: exercise_id } })
        await this.service.deleteOne(workout_exercise)
    }

}