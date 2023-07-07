import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from 'src/entities/exercises.entity';
import { ExercisesDto } from 'src/dto/exercises.dto';
import { DecoderService } from './decoder.service';

@Injectable()
export class ExercisesService {
    
    @InjectRepository(Exercise)
    private ExercisesRepository: Repository<Exercise>;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;

    //  findAll(): Promise<Exercise[]> {
    //      return this.ExercisesRepository.find();
    //  }

    async findOne(Exercisename: string): Promise<Exercise | null> {
         return new Exercise();
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

}