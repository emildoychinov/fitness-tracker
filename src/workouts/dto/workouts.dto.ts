import { IsEmail, IsOptional, IsString, MinLength, IsNumber } from 'class-validator';

export class WorkoutsDto {

    @IsString()
    public readonly name: string;

    @IsNumber()
    public readonly workout_id: number;
    
}