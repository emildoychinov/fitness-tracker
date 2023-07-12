import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req } from '@nestjs/common';
import { ExercisesDto } from 'src/exercises/dto/exercises.dto';
import { DecoderService } from 'src/decoder.service';
import { ExercisesService } from 'src/exercises/services/exercises.service';

@Controller('exercise')
export class ExercisesController {
    @Inject(ExercisesService)
    private readonly service: ExercisesService;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;

    @Post('create')
    async createExercise(@Req() req: any, @Body() body: ExercisesDto){
        var jwt_token = await this.decoder.get_jwt_token(req);
        
        var res = await this.service.createExercise(body, jwt_token);
        return res;
    }

    @Patch('update/:id')
    async updateExercise(@Param('id') exercise_id, @Req() req:any, @Body() body: any) {
        let jwtToken = await this.decoder.get_jwt_token(req);
        return await this.service.updateExercise(jwtToken, body, exercise_id)
    }

    @Delete('delete/:id')
    async deleteExercise(@Param('id') exercise_id, @Req() req:any) {
        let jwtToken = await this.decoder.get_jwt_token(req);
        return await this.service.deleteExercise(jwtToken, exercise_id)
    }
}