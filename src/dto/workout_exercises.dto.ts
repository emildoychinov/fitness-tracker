import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class Workout_exercisesDto {


    @IsNumber()
    public readonly kg: number;

    @IsNumber()
    public readonly reps: number;
    
    @IsNumber()
    public readonly sets: number;

    @IsNumber()
    public readonly workout_id: number;

    @IsNumber()
    public readonly exercise_id: number;
}