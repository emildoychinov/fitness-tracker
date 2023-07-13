import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from 'src/exercises/entity/exercises.entity';
import { ExercisesDto } from 'src/exercises/dto/exercises.dto';
import { DecoderService } from '../../decoder.service';
import { Workout_exercise } from 'src/workout_exercises/entity/workout_exercises.entity';

@Injectable()
export class ExercisesService {
    
    @InjectRepository(Exercise)
    private ExercisesRepository: Repository<Exercise>;
    @InjectRepository(Workout_exercise)
    private WorkoutExerciseRepository: Repository<Workout_exercise>;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;

    //  findAll(): Promise<Exercise[]> {
    //      return this.ExercisesRepository.find();
    //  }

    async getExercise(exercise_id: number): Promise<Exercise | null> {
         return await this.ExercisesRepository.findOne({where : { id : exercise_id}});
    }

    async createExercise(body: ExercisesDto, jwt_token: string) {
        const {name, muscle_group}: ExercisesDto = body;

        var user = await this.decoder.get_user(jwt_token);

        var exercise = new Exercise();
        exercise.creator = user;
        exercise.muscle_group = muscle_group;
        exercise.name = name;

        console.log(exercise);
        return this.ExercisesRepository.save(exercise);
    }

    async updateExercise(jwtToken: string, body: any, exercise_id: any) {
        let user = await this.decoder.get_user(jwtToken);

        let exercise: Exercise = await this.ExercisesRepository.findOne({
            where: {
                creator: {
                    id: user.id
                },
                id: exercise_id
            }
        })

        exercise.name = body.name;
        exercise.muscle_group = body.muscle_group
        return await this.ExercisesRepository.save(exercise)
    }

    async deleteExercise(exercise_id, jwtToken: string) {
        let user = await this.decoder.get_user(jwtToken);
        console.log("user", user);
        
        await this.WorkoutExerciseRepository.delete({
                exercise: {
                    id: exercise_id,
                    creator: {
                        id: user.id
                    }
                }
            });

        return await this.ExercisesRepository.delete({
            creator: {
                id: user.id
            },
            id: exercise_id
        })
    }
}