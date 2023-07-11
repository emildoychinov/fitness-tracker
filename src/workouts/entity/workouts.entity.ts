import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { Workout_exercise } from 'src/workout_exercises/entity/workout_exercises.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User)
  creator: User;

  @Column({
    unique : true
  })
  name: string;




}