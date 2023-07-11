import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class ExercisesDto {


    @IsString()
    public readonly name: string;

    @IsString()
    public readonly muscle_group: string;
    
}