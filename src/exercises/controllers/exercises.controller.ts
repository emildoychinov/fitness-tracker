import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Req } from '@nestjs/common';
import { ExercisesDto } from 'src/exercises/dto/exercises.dto';
import { DecoderService } from 'src/decoder.service';
import { ExercisesService } from 'src/exercises/services/exercises.service';

@Controller('exercises')
export class ExercisesController {
    @Inject(ExercisesService)
    private readonly service: ExercisesService;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;

    @Get('exercises/:EXERCISE_ID')
    async getExercise(@Param('EXERCISE_ID') exercise_id: number) {
        var res = await this.service.getExercise(exercise_id);
        return res;
    }
    
    @Post('create_exercise')
    async createExercise(@Req() req: any, @Body() body: ExercisesDto){
        var jwt_token = await this.decoder.get_jwt_token(req);
        
        var res = await this.service.createExercise(body, jwt_token);
        return res;
    }

    @Patch('update/:ID')
    async updateExercise(@Param('ID') exercise_id, @Req() req:any, @Body() body: any) {
        let jwtToken = await this.decoder.get_jwt_token(req);
        return await this.service.updateExercise(jwtToken, body, exercise_id)
    }

    @Delete('delete/:ID')
    async deleteExercise(@Param('ID') exercise_id, @Req() req:any) {
        let jwtToken = await this.decoder.get_jwt_token(req);
        console.log(jwtToken);
        return await this.service.deleteExercise(exercise_id, jwtToken)
    }
}