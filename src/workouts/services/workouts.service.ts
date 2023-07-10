import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Workout } from 'src/workouts/common/entity/workouts.entity';
import { WorkoutsDto } from 'src/workouts/common/dto/workouts.dto';
import { DecoderService } from '../../decoder.service';
import { User } from 'src/users/common/entity/users.entity';

@Injectable()
export class WorkoutsService {
    
    @InjectRepository(Workout)
    private WorkoutsRepository: Repository<Workout>;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;
    //  findAll(): Promise<Workout[]> {
    //      return this.WorkoutsRepository.find();
    //  }

    async findByUser(user: string): Promise<Workout[] | null> {
         var res = await this.WorkoutsRepository.find({where : { creator : { username : user }}});
         return res;
    }

    async findByFilter(filteringOption: string, filter: string): Promise<Workout[] | null>{
        switch(filteringOption){
            case "name" :
                console.log(filter);
                var res =  await this.WorkoutsRepository.find({where : 
                    [{
                        name : Like('%'+filter+'%')
                    }]
                });
                console.log(res);
                return res;
        }
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