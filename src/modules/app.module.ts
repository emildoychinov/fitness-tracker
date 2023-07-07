import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { HomeController } from '../controllers/home.controller';
import { UsersModule } from './users.module';
import { UsersController } from '../controllers/users.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ExercisesModule } from './exercises.module';
import { WorkoutsModule } from './workouts.module';
import { WorkoutExerciseModule } from './workout_exercises.module';

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
  ],
  controllers: [AppController, HomeController],
  providers: [AppService],
})

export class AppModule { }
