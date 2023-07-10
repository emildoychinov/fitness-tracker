import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommentController } from 'src/comments/controllers/comment.controller';
import { Comment } from 'src/comments/common/entity/comments.entity';
import { User } from 'src/users/common/entity/users.entity';
import { Workout } from 'src/workouts/common/entity/workouts.entity';
import { CommentService } from 'src/comments/services/comment.service';
import { DecoderService } from 'src/decoder.service';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Comment, User, Workout]), AuthModule],
    exports: [TypeOrmModule],
    providers: [CommentService, DecoderService],
    controllers: [CommentController],
})
export class CommentModule {}
