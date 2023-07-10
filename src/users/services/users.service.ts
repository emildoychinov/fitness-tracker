import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entity/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    //  findAll(): Promise<User[]> {
    //      return this.usersRepository.find();
    //  }

    async findOne(username: string): Promise<User | null> {
         return this.usersRepository.findOneBy({ username });
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    create(user: User) {
        return this.usersRepository.create(user)
    }

    async save(user: User) {
        this.create(user)
        await this.usersRepository.save(user)
    }

}