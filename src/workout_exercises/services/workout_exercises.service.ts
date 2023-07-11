import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from 'src/workouts/entity/workouts.entity';
import { Workout_exercisesDto } from 'src/workout_exercises/dto/workout_exercises.dto';
import { Workout_exercise } from 'src/workout_exercises/entity/workout_exercises.entity';
import { Exercise } from 'src/exercises/entity/exercises.entity';
import { DecoderService } from 'src/decoder.service';

@Injectable()
export class WorkoutExercisesService {
    
    @InjectRepository(Workout)
    private WorkoutsRepository: Repository<Workout>;
    @InjectRepository(Exercise)
    private ExerciseRepository: Repository<Exercise>;
    @InjectRepository(Workout_exercise)
    private WorkoutExerciseRepository: Repository<Workout_exercise>;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;
    //  findAll(): Promise<Workout[]> {
    //      return this.WorkoutsRepository.find();
    //  }


    async createWorkout_exercise(body: Workout_exercisesDto) {
        const {kg, reps, sets, workout_id, exercise_id}: Workout_exercisesDto = body;

        var exercise : Exercise = await this.ExerciseRepository.findOne({ where : { id:exercise_id }});
        var workout : Workout = await this.WorkoutsRepository.findOne({ where : { id:workout_id }});

        if(!workout){
            return {   
                code : 404,
                message : "Not found"
            }
        }

        if(!exercise){
            return {   
                code : 404,
                message : "Not found"
            }
        }

        var workout_exercise = new Workout_exercise();
        workout_exercise.kilograms = kg;
        workout_exercise.reps = reps;
        workout_exercise.sets = sets;
        workout_exercise.exercise = exercise;
        workout_exercise.workout = workout;


        console.log(workout_exercise);
        return this.WorkoutExerciseRepository.save(workout_exercise);
    }

    async removeWorkout_exercise(jwt_token: string, body: any){

        var user = await this.decoder.get_user(jwt_token);
        var workout_exercise:Workout_exercise = await this.WorkoutExerciseRepository.findOne({ 
            where : { 
                workout : { 
                    id : body.workout_id,
                    creator : {
                        id : user.id
                    } 
                },
                exercise : { id : body.exercise_id }
            }
        })
        if(!workout_exercise){
            return {
                code : 404,
                message : "not found"
            }
        }
        return await this.WorkoutExerciseRepository.remove(workout_exercise);
    }

}