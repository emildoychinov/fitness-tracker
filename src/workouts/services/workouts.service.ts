import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from 'src/workouts/common/entity/workouts.entity';
import { WorkoutsDto } from 'src/workouts/common/dto/workouts.dto';
import { DecoderService } from '../../decoder.service';

@Injectable()
export class WorkoutsService {
    
    @InjectRepository(Workout)
    private WorkoutsRepository: Repository<Workout>;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;
    //  findAll(): Promise<Workout[]> {
    //      return this.WorkoutsRepository.find();
    //  }

    async findOne(Workout_tname: string): Promise<Workout | null> {
         return new Workout();
    }

    async createWorkout(body: WorkoutsDto, jwt_token: string) {
        const {name}: WorkoutsDto = body;

        console.log("jwt : ", jwt_token);
        var user = await this.decoder.get_user(jwt_token);

        console.log("user : ", user);

        var workout = new Workout();
        workout.creator = user;
        workout.name = name;

        console.log(workout);
        return this.WorkoutsRepository.save(workout);
    }

}