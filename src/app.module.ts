import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { HomeController } from './controllers/home.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/controllers/users.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { WorkoutExerciseModule } from './modules/workout_exercises.module';
import { CommentModule } from './comments/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'fitnesstracker',
      entities: [__dirname + './**/*.entity.ts'],
      migrations: ["./migrations/*{.ts}"],
      autoLoadEntities: true,
      synchronize: false
    }),
    UsersModule,
    ExercisesModule,
    WorkoutsModule,
    WorkoutExerciseModule,
    CommentModule
  ],
  controllers: [AppController, HomeController],
  providers: [AppService],
})

export class AppModule { }
