import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { AuthHelper } from 'src/auth/helper/auth.helper';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtStrategy } from 'src/auth/strategy/auth.strategy';
import { ExercisesController } from 'src/exercises/controllers/exercises.controller';
import { UsersController } from 'src/users/controllers/users.controller';
import { Exercise } from 'src/exercises/common/entity/exercises.entity';
import { ExercisesService } from 'src/exercises/services/exercises.service';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from '../users/users.module';
import { DecoderService } from 'src/decoder.service';


@Module({
    imports: [TypeOrmModule.forFeature([Exercise]), UsersModule],
    exports: [TypeOrmModule],
    controllers: [ExercisesController, UsersController],
    providers: [ExercisesService, UsersService, DecoderService,JwtService],
})
export class ExercisesModule {}
