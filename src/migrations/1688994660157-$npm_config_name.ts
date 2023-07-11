import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1688994660157 implements MigrationInterface {
    name = ' $npmConfigName1688994660157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "saved_workout" ("id" SERIAL NOT NULL, "workoutId" integer, "saverId" uuid, CONSTRAINT "PK_c5cde24c6bda4c426aa47312700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "saved_workout" ADD CONSTRAINT "FK_336efc0e9424b27c7419deccdba" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_workout" ADD CONSTRAINT "FK_b26bbc5d8d4eefbd8f6c947c48d" FOREIGN KEY ("saverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "saved_workout" DROP CONSTRAINT "FK_b26bbc5d8d4eefbd8f6c947c48d"`);
        await queryRunner.query(`ALTER TABLE "saved_workout" DROP CONSTRAINT "FK_336efc0e9424b27c7419deccdba"`);
        await queryRunner.query(`DROP TABLE "saved_workout"`);
    }

}
