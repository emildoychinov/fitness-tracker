import { Controller, Post, Res, Get , Body} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Response } from 'express'; 
import { User } from '../entities/users.entity';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    async createUser() {
        return this.usersService.findAll();
    }

    @Post("/users")
    async save(createUser: User) {
        const user = new User();
        user.firstName = 'stamat'
        user.lastName = 'sagok'
        this.usersService.save(user)
    }
}