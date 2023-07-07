import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class WorkoutsDto {

    @IsString()
    public readonly name: string;
    
}