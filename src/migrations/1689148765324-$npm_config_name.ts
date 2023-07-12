import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1689148765324 implements MigrationInterface {
    name = ' $npmConfigName1689148765324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "UQ_7fbf9f7ec762ad730ba990012de"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "UQ_7fbf9f7ec762ad730ba990012de" UNIQUE ("name")`);
    }

}
