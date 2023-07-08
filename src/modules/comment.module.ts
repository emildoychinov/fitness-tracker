import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommentController } from 'src/controllers/comment.controller';
import { Comment } from 'src/entities/comments.entity';
import { User } from 'src/entities/users.entity';
import { Workout } from 'src/entities/workouts.entity';
import { CommentService } from 'src/services/comment.service';
import { DecoderService } from 'src/services/decoder.service';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Comment, User, Workout]), AuthModule],
    exports: [TypeOrmModule],
    providers: [CommentService, DecoderService],
    controllers: [CommentController],
})
export class CommentModule {}
