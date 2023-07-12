import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req } from '@nestjs/common';
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

    @Post('create')
    async createWorkoutExercise(@Body() body: Workout_exercisesDto) {

        var res = await this.service.createWorkout_exercise(body);
        return res;
    }

    @Delete('delete_exercis/:WORKOUT_ID/:WE_ID')
    async removeWorkoutExercise(@Param('WORKOUT_ID') workout_id, @Param('WE_ID') we_id , @Req() req, @Body() body : any) {
        var jwt_token: string = await this.decoder.get_jwt_token(req);
        return await this.service.removeWorkout_exercise(jwt_token, workout_id, we_id);
    }

    @Patch('update/:WORKOUT_ID/:WE_ID')
    async updateWE(@Param('WORKOUT_ID') workout_id, @Param('WE_ID') we_id ,  @Req() req: any, @Body() body: any) {
        let jwtToken = await this.decoder.get_jwt_token(req)
        return await this.service.updateWorkoutExercise(jwtToken, body, workout_id, we_id)
    }

    @Get("findall/:id")
    async getAllWE(@Param('id') workout_id: number, @Req() req: any) {
        let jwtToken = await this.decoder.get_jwt_token(req)
        return await this.service.findAllWorkoutExercises(jwtToken, workout_id)
    }

}

