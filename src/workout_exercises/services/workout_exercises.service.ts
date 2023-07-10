import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Workout } from 'src/workouts/common/entity/workouts.entity';
import { Workout_exercisesDto } from 'src/workout_exercises/common/dto/workout_exercises.dto';
import { Exercise } from 'src/exercises/common/entity/exercises.entity';
import { Workout_exercise } from '../common/entities/workout_exercises.entity';

@Injectable()
export class WorkoutExercisesService {
    
    @InjectRepository(Workout)
    private WorkoutsRepository: Repository<Workout>;
    @InjectRepository(Exercise)
    private ExerciseRepository: Repository<Exercise>;
    @InjectRepository(Workout_exercise)
    private WorkoutExerciseRepository: Repository<Workout_exercise>;
    //  findAll(): Promise<Workout[]> {
    //      return this.WorkoutsRepository.find();
    //  }

    async findOne(Workout_exercise_name: string): Promise<Workout | null> {
        return new Workout();
    }

    async createWorkout_exercise(body: Workout_exercisesDto) {
        const {kg, reps, sets, workout_id, exercise_id}: Workout_exercisesDto = body;

        var exercise : Exercise = await this.ExerciseRepository.findOne({ where : { id:exercise_id }});
        var workout : Workout = await this.WorkoutsRepository.findOne({ where : { id:workout_id }});

        var workout_exercise = new Workout_exercise();
        workout_exercise.kilograms = kg;
        workout_exercise.reps = reps;
        workout_exercise.sets = sets;
        workout_exercise.exercise = exercise;
        workout_exercise.workout = workout;


        console.log(workout_exercise);
        return this.WorkoutExerciseRepository.save(workout_exercise);
    }

    async deleteOne(exercise: Workout_exercise) {
        await this.WorkoutExerciseRepository.delete(exercise)
    }
}