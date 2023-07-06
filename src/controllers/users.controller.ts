import { Controller, Post, Res, Get , Body} from '@nestjs/common';
import { UsersService} from '../services/users.service';
import { Response } from 'express'; 
import { User } from '../entities/users.entity';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    // @Get()
    // async createUser() {
    //     return this.usersService.findAll();
    // }

    @Post("/users")
    async save(username: string, password: string) {
        const user = new User();
        user.username = username;
        user.password = password;
        this.usersService.save(user)
        return "success!"
    }

    @Get("/user")
    async getUser(username: string){
        const res = await this.usersService.findOne('stamat');
        console.log(res);
    }
}