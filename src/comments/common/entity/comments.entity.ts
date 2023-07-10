import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../../users/common/entity/users.entity';
import { Workout } from '../../../workouts/common/entity/workouts.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => Workout)
  workout: Workout;
  
  @Column()
  content: string;

}