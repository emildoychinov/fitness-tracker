import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { Workout_exercise } from 'src/workout_exercises/entity/workout_exercises.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  creator: User;

  @Column({
    unique : true
  })
  name: string;

  @Column()
  muscle_group: string;

  @OneToMany(() => Workout_exercise, (workout_exercise) => workout_exercise.exercise, {nullable : true})
  workouts : Workout_exercise[] | null;
}