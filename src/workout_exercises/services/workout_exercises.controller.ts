import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { Workout_exercisesDto } from 'src/workout_exercises/common/dto/workout_exercises.dto';
import { WorkoutExercisesService } from 'src/workout_exercises/services/workout_exercises.service';

@Controller('workout_exercise')
export class WorkoutExercisesController {
    @Inject(WorkoutExercisesService)
    private readonly service: WorkoutExercisesService; 

    @Post('test')
    async createWorkoutExercise(@Body() body: Workout_exercisesDto){
        
        var res = await this.service.createWorkout_exercise(body);
        return res;
    }

}