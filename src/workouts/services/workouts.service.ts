import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Workout } from 'src/workouts/entity/workouts.entity';
import { WorkoutsDto } from 'src/workouts/dto/workouts.dto';
import { DecoderService } from '../../decoder.service';
import { User } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { savedWorkout } from '../entity/savedWorkouts.entity';

@Injectable()
export class WorkoutsService {
    
    @InjectRepository(Workout)
    private WorkoutsRepository: Repository<Workout>;
    @Inject(DecoderService)
    private readonly decoder: DecoderService;
    @InjectRepository(User)
    private UserRepository: Repository<User>;
    @InjectRepository(savedWorkout)
    private SavedWorkoutRepository: Repository<savedWorkout>
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

    async saveWorkout(body: any, jwt_token: string){
        var user = await this.decoder.get_user(jwt_token);
        var workout = await this.WorkoutsRepository.findOne( { where : { id : body.id }});
        console.log(workout);
        var SavedWorkout = new savedWorkout();
        SavedWorkout.saver = user;
        SavedWorkout.workout = workout;
        return await this.SavedWorkoutRepository.save(SavedWorkout);

    }

    async unsaveWorkout(body: any, jwt_token: string){
        var user = user = await this.decoder.get_user(jwt_token);
        console.log(user);
        var workout = await this.SavedWorkoutRepository.findOne({ 
            where : { 
                id : body.id,
                saver : { id : user.id }
            }
        });

        return await this.SavedWorkoutRepository.remove(workout);

        
    }

    async createWorkout(body: WorkoutsDto, jwt_token: string) {
        const {name}: WorkoutsDto = body;

        console.log("jwt : ", jwt_token);
        var user = await this.decoder.get_user(jwt_token);

        console.log("user : ", user);

        var workout = new Workout();
        workout.creator = user;
        workout.name = name;
        
        await this.UserRepository.save(user);
        console.log(workout);
        return await this.WorkoutsRepository.save(workout);
    }

    async deleteWorkout(body: Workout) {
        await this.WorkoutsRepository.delete(body)
    }

}