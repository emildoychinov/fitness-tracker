import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { Workout } from './workouts.entity';

@Entity()
export class savedWorkout {

    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => Workout)
    workout: Workout

    @ManyToOne(() => User)
    saver: User
  

}