import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  creator: User;

  @Column({
    unique : true
  })
  name: string;

}