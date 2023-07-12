import { Body, Controller, Delete, Get, Inject, Param, Post, Req } from '@nestjs/common';
import { WorkoutsDto } from 'src/workouts/dto/workouts.dto';
import { DecoderService } from 'src/decoder.service';
import { WorkoutsService } from 'src/workouts/services/workouts.service';
import { User } from 'src/users/entity/users.entity';
import { Workout } from '../entity/workouts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('workouts')
export class WorkoutsController {
    @Inject(WorkoutsService)
    private readonly service: WorkoutsService;

    @Inject(DecoderService)
    private readonly decoder: DecoderService;

    @InjectRepository(Workout)
    private workoutsRepository: Repository<Workout>;

    @Post("user_workouts")
    async getUserWorkouts(@Body() body: any){
        var res = await this.service.findByUser(body.user);
        return res;
    }
    @Get("my_workouts")
    async getMyWorkouts(@Req() req: any){
        var jwt_token = await this.decoder.get_jwt_token(req);
        var user = (await this.decoder.get_user(jwt_token)).username;
        var res = await this.service.findByUser(user);
        return res;
    }
    @Post("filter")
    async getFilteredWorkouts(@Body() body: any){
        console.log(body.filter);
        var res = await this.service.findByFilter(body.filteringOption, body.filter);
        return res;
    }

    @Post('create_workout')
    async createWorkout(@Req() req: any, @Body() body: WorkoutsDto){
        
        console.log("headers : ", req.headers.authorization);
        var jwt_token = await this.decoder.get_jwt_token(req);
        console.log(jwt_token);
        var res = await this.service.createWorkout(body, jwt_token);
        return res;
    }

    @Post('save_workout')
    async saveWorkout(@Req() req: any, @Body() body: any){

        var jwt_token = await this.decoder.get_jwt_token(req);
        var res = await this.service.saveWorkout(body, jwt_token);
        return res;
    }

    @Post('unsave_workout')
    async unsaveWorkout(@Req() req: any, @Body() body: any){

        var jwt_token = await this.decoder.get_jwt_token(req);
        var res = await this.service.unsaveWorkout(body, jwt_token);
        return res;
    }
    
    @Delete('delete_workout/:WORKOUT_ID')
    async deleteWorkout(@Param('WORKOUT_ID') workout_id: number, @Req() req: any) {

        var jwt_token = await this.decoder.get_jwt_token(req);
        var res = await this.service.deleteWorkout(workout_id,jwt_token);
        return res;

    }

}