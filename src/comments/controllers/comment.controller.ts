import { Controller, Post, Get, Body, Inject } from '@nestjs/common';
import { Comment } from 'src/comments/entity/comments.entity';
import { CommentService } from 'src/comments/services/comment.service';
import { Commentdto } from 'src/comments/dto/comment.dto';
import { Workout } from 'src/workouts/entity/workouts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DecoderService } from '../../decoder.service';

@Controller("/comment")
export class CommentController {
    constructor(private readonly commentService: CommentService) { }
    @InjectRepository(Workout)
    private workoutsRepository: Repository<Workout>;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;

    @Post()
    async postComment(@Body() body: Commentdto, jwt_token: string) {
        const { workout_id, content }: Commentdto = body;

        let workout: Workout = await this.workoutsRepository.findOne({ where: { id: workout_id} });
        let user = await this.decoder.get_user(jwt_token);

        let comment = new Comment();
        comment.creator = user;
        comment.workout = workout;
        comment.content = content;

        return this.commentService.saveComment(comment)
    }
}
