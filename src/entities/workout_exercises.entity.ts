import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { Exercise } from './exercises.entity';
import { Workout } from './workouts.entity';

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