import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { WorkoutsDto } from 'src/workouts/common/dto/workouts.dto';
import { DecoderService } from 'src/decoder.service';
import { WorkoutsService } from 'src/workouts/services/workouts.service';
import { User } from 'src/users/common/entity/users.entity';

@Controller('workouts')
export class WorkoutsController {
    @Inject(WorkoutsService)
    private readonly service: WorkoutsService;

    @Inject(DecoderService)
    private readonly decoder: DecoderService;

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
        
        var jwt_token = await this.decoder.get_jwt_token(req);
        console.log(jwt_token);
        var res = await this.service.createWorkout(body, jwt_token);
        return res;
    }

}