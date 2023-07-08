import { IsNumber, IsString } from "class-validator";

export class Commentdto {

    @IsNumber()
    public readonly workout_id: number;

    @IsString()
    public readonly content: string;

}