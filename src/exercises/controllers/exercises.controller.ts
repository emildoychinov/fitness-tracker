import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ExercisesDto } from 'src/exercises/common/dto/exercises.dto';
import { DecoderService } from 'src/decoder.service';
import { ExercisesService } from 'src/exercises/services/exercises.service';

@Controller('exercise')
export class ExercisesController {
    @Inject(ExercisesService)
    private readonly service: ExercisesService;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;

    @Post('test')
    async createExercise(@Req() req: any, @Body() body: ExercisesDto){
        var jwt_token = await this.decoder.get_jwt_token(req);
        
        var res = await this.service.createExercise(body, jwt_token);
        return res;
    }

}