import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { WorkoutsDto } from 'src/workouts/common/dto/workouts.dto';
import { DecoderService } from 'src/decoder.service';
import { WorkoutsService } from 'src/workouts/services/workouts.service';

@Controller('workout')
export class WorkoutsController {
    @Inject(WorkoutsService)
    private readonly service: WorkoutsService;

    @Inject(DecoderService)
    private readonly decoder: DecoderService;

    @Post('test')
    async createWorkout(@Req() req: any, @Body() body: WorkoutsDto){
        
        var jwt_token = await this.decoder.get_jwt_token(req);
        console.log(jwt_token);
        var res = await this.service.createWorkout(body, jwt_token);
        return res;
    }

}