import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/users/entity/users.entity';
import { Workout } from 'src/workouts/entity/workouts.entity';
import { Exercise } from 'src/exercises/entity/exercises.entity';
import { Workout_exercise } from 'src/workout_exercises/entity/workout_exercises.entity';
import { Comment } from 'src/comments/entity/comments.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'fitnesstracker',
  entities: ['dist/src/**/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js']
});