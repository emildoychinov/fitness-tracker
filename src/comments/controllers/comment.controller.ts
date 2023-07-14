import { Controller, Post, Get, Body, Inject, Param, Req, Delete } from '@nestjs/common';
import { Comment } from 'src/comments/entity/comments.entity';
import { CommentService } from 'src/comments/services/comment.service';
import { Commentdto } from 'src/comments/dto/comment.dto';
import { Workout } from 'src/workouts/entity/workouts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DecoderService } from '../../decoder.service';

@Controller("/comments")
export class CommentController {
    constructor(private readonly commentService: CommentService) { }
    @InjectRepository(Workout)
    private workoutsRepository: Repository<Workout>;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;

    @Post('post')
    async postComment(@Req() req: any, @Body() body: Commentdto) {
        var jwt_token = await this.decoder.get_jwt_token(req);
        console.log('comments;jwt_token ', jwt_token)
        return await this.commentService.comment(jwt_token, body)
    }

    @Get('workout/:WORKOUT_ID')
    async loadComments(@Param('WORKOUT_ID') workout_id: number){
        return await this.commentService.loadComments(workout_id);
    }

    @Delete('workout/:WORKOUT_ID')  
    async deleteComment(@Param('WORKOUT_ID') workout_id: number){
        return await this.commentService.deleteComment(workout_id);
    }
}
