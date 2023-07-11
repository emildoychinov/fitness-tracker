import { Body, Controller, Delete, Get, Inject, Post, Req } from '@nestjs/common';
import { Workout_exercisesDto } from 'src/workout_exercises/dto/workout_exercises.dto';
import { WorkoutExercisesService } from 'src/workout_exercises/services/workout_exercises.service';
import { Workout_exercise } from '../entity/workout_exercises.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DecoderService } from 'src/decoder.service';

@Controller('workout_exercise')
export class WorkoutExercisesController {
    @Inject(WorkoutExercisesService)
    private readonly service: WorkoutExercisesService;
    @InjectRepository(Workout_exercise)
    private workoutsExerciseRepository: Repository<Workout_exercise>;
    @Inject(DecoderService)
    private readonly decoder: DecoderService

    @Post('test')
    async createWorkoutExercise(@Body() body: Workout_exercisesDto) {

        var res = await this.service.createWorkout_exercise(body);
        return res;
    }


    @Post('delete_exercise')
    async removeWorkoutExercise(@Req() req, @Body() body : any) {
        var jwt_token: string = await this.decoder.get_jwt_token(req);
        return await this.service.removeWorkout_exercise(jwt_token, body);
    }

}