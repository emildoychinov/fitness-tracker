import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exercise } from '../../exercises/entity/exercises.entity';
import { Workout } from '../../workouts/entity/workouts.entity';

@Entity()
export class Workout_exercise {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Exercise) 
  exercise: Exercise;

  @ManyToOne(() => Workout)
  workout: Workout;

  @Column()
  sets: number;

  @Column()
  reps: number;

  @Column()
  kilograms: number;
}