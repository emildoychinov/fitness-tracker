import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/auth/auth.controller';
import { AuthHelper } from 'src/auth/auth.helper';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/auth.strategy';
import { ExercisesController } from 'src/controllers/exercises.controller';
import { UsersController } from 'src/controllers/users.controller';
import { Exercise } from 'src/entities/exercises.entity';
import { ExercisesService } from 'src/services/exercises.service';
import { UsersService } from 'src/services/users.service';
import { UsersModule } from './users.module';
import { DecoderService } from 'src/services/decoder.service';


@Module({
    imports: [TypeOrmModule.forFeature([Exercise]), UsersModule],
    exports: [TypeOrmModule],
    controllers: [ExercisesController, UsersController],
    providers: [ExercisesService, UsersService, DecoderService,JwtService],
})
export class ExercisesModule {}
