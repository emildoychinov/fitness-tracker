import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Workout } from 'src/entities/workouts.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Workout)
        private workoutRepository: Repository<Workout>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ) { }

    // async addComment(creator: User, content: string, workout: Workout) {
    //     const payload = {
    //         creator,
    //         content,
    //         workout
    //     }
    // }

    async findOne(id: number): Promise<Workout> {
        return this.workoutRepository.findOneBy({ id })
    }

    async saveComment(comment: Comment) {
        await this.commentRepository.save(comment)
    }

}
