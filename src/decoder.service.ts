import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users/entity/users.entity";
import { Repository } from "typeorm/repository/Repository";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class DecoderService{

    @InjectRepository(User) 
    private UsersRepository: Repository<User>;

    private readonly jwt: JwtService;

    constructor(jwt: JwtService) {
        this.jwt = jwt;
    }

    async getUserByName(username : string):Promise<User | null>{
        var res = await this.UsersRepository.findOne({ where : { username }});
        return res
    }
    async get_jwt_token(req : any):Promise<string> {
        var token_index = req.rawHeaders.indexOf('Authorization')+1;
        var jwt_token = req.rawHeaders[token_index].split(' ')[1];
        return jwt_token;
    }

    async get_user(jwt_token : string):Promise<User> {

        var res: any = await this.jwt.decode(jwt_token, null);
        var id: string = res.id;
        var user: User = await this.UsersRepository.findOne({ where: { id } });

        console.log('user : ', user)
        return user;
    }
}