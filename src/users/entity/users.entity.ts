import { Exclude } from 'class-transformer';
import { Exercise } from 'src/exercises/entity/exercises.entity';
import { Workout } from 'src/workouts/entity/workouts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Comment } from 'src/comments/entity/comments.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique : true
  })
  username: string;

  @Exclude()
  @Column()
  password: string;


}