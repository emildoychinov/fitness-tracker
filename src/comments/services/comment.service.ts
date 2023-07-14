import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from 'src/comments/entity/comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/users.entity';
import { Workout } from 'src/workouts/entity/workouts.entity';
import { DecoderService } from 'src/decoder.service';
import { Commentdto } from '../dto/comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @Inject(DecoderService)
        private readonly decoder: DecoderService
    ) { }

    async findOne(id: number): Promise<Workout> {
        return this.workoutRepository.findOneBy({ id })
    }

    async comment(jwt_token, body: Commentdto) {
        
        const { workout_id, content }: Commentdto = body;
        
        let workout: Workout = await this.workoutRepository.findOne({ where: { id: workout_id} });
        let user = await this.decoder.get_user(jwt_token);

        console.log("comments, user ", user);

        let comment = new Comment();
        comment.creator = user;
        comment.workout = workout;
        comment.content = content;

        return await this.commentRepository.save(comment)
    }

    async loadComments(workout_id: number){
        return await this.commentRepository.find({
            where : {
                workout :{
                    id: workout_id
                }
            }
        }
        )
    }

    async deleteComment(workout_id: number) {
        return await this.commentRepository.delete({
            id: workout_id
        })
    }

}
