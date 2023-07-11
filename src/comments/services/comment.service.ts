import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from 'src/comments/entity/comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/users.entity';
import { Workout } from 'src/workouts/entity/workouts.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ) { }

    async findOne(id: number): Promise<Workout> {
        return this.workoutRepository.findOneBy({ id })
    }

    async saveComment(comment: Comment) {
        await this.commentRepository.save(comment)
    }

}
