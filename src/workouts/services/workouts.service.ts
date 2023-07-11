import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Workout } from 'src/workouts/entity/workouts.entity';
import { WorkoutsDto } from 'src/workouts/dto/workouts.dto';
import { DecoderService } from '../../decoder.service';
import { User } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { savedWorkout } from '../entity/savedWorkouts.entity';
import { Workout_exercise } from 'src/workout_exercises/entity/workout_exercises.entity';
import { error } from 'console';

@Injectable()
export class WorkoutsService {

    @InjectRepository(Workout)
    private WorkoutsRepository: Repository<Workout>;
    @InjectRepository(Workout_exercise)
    private WorkoutExerciseRepository: Repository<Workout_exercise>;
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
        var res = await this.WorkoutsRepository.find({ where: { creator: { username: user } } });
        return res;
    }

    async findByFilter(filteringOption: string, filter: string): Promise<Workout[] | null> {
        switch (filteringOption) {
            case "name":
                console.log(filter);
                var res = await this.WorkoutsRepository.find({
                    where:
                        [{
                            name: Like('%' + filter + '%')
                        }]
                });
                console.log(res);
                return res;
        }
    }

    async saveWorkout(body: any, jwt_token: string) {
        var user = await this.decoder.get_user(jwt_token);
        var workout = await this.WorkoutsRepository.findOne({ where: { id: body.id } });
        console.log(workout);
        var SavedWorkout = new savedWorkout();
        SavedWorkout.saver = user;
        SavedWorkout.workout = workout;
        return await this.SavedWorkoutRepository.save(SavedWorkout);

    }

    async unsaveWorkout(body: any, jwt_token: string) {
        var user = user = await this.decoder.get_user(jwt_token);
        console.log(user);
        var workout = await this.SavedWorkoutRepository.findOne({
            where: {
                id: body.id,
                saver: { id: user.id }
            }
        });

        return await this.SavedWorkoutRepository.remove(workout);


    }

    async createWorkout(body: WorkoutsDto, jwt_token: string) {
        const { name }: WorkoutsDto = body;

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

    async deleteWorkout(workout_id,jwtToken : string) {

        let user = await this.decoder.get_user(jwtToken);
        let workout: Workout = await this.WorkoutsRepository.findOne({
            where: {
                id: workout_id,
                creator : {
                    id : user.id
                } 
            }
        })

        return await this.WorkoutsRepository.remove(workout);
    }

    async updateWorkout(jwtToken: string, body: any) {

        let user = await this.decoder.get_user(jwtToken);
        let workout: Workout = await this.WorkoutsRepository.findOne({
            where: {
                id: body.workout_id,
                creator: {
                    id: user.id
                }
            }
        })

        const { creator, name }: Workout = body;

        if (user.id != creator.id) {
            throw new Error('User is not the creator of the workout')
        }
        if (name) workout.name = name;
        await this.WorkoutsRepository.save(workout);
        
    }
}