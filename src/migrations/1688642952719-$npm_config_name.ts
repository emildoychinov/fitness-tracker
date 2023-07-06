import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1688642952719 implements MigrationInterface {
    name = ' $npmConfigName1688642952719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exercise" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "muscle_group" character varying NOT NULL, "creatorId" uuid, CONSTRAINT "UQ_4420597915e901ab5d6f2bcaee4" UNIQUE ("name"), CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creatorId" uuid, CONSTRAINT "UQ_7fbf9f7ec762ad730ba990012de" UNIQUE ("name"), CONSTRAINT "PK_ea37ec052825688082b19f0d939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout_exercise" ("id" SERIAL NOT NULL, "sets" integer NOT NULL, "reps" integer NOT NULL, "kilograms" integer NOT NULL, "exerciseId" integer, "workoutId" integer, CONSTRAINT "PK_9598996a913c5f5114f9e6403b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "creatorId" uuid, "workoutId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_25cecff361c08584f2a91261664" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_b4e47fd163c5f72037121a8eabd" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" ADD CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" ADD CONSTRAINT "FK_35fe273716366d768fba9964813" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_b6bf60ecb9f6c398e349adff52f" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_69fb917ee1cf6c917e8b8ef0334" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_69fb917ee1cf6c917e8b8ef0334"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_b6bf60ecb9f6c398e349adff52f"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" DROP CONSTRAINT "FK_35fe273716366d768fba9964813"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" DROP CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_b4e47fd163c5f72037121a8eabd"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_25cecff361c08584f2a91261664"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "workout_exercise"`);
        await queryRunner.query(`DROP TABLE "workout"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
    }

}
