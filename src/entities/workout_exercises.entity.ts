import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/common/entity/users.entity';
import { Exercise } from '../exercises/common/entity/exercises.entity';
import { Workout } from '../workouts/common/entity/workouts.entity';

@Entity()
export class Workout_exercise {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Exercise)
  exercise: Exercise;

  @ManyToOne(() => Workout)
  workout: Workout

  @Column()
  sets: number;

  @Column()
  reps: number;

  @Column()
  kilograms: number;
}