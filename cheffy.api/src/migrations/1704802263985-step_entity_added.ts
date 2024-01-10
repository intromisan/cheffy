import { MigrationInterface, QueryRunner } from "typeorm";

export class StepEntityAdded1704802263985 implements MigrationInterface {
    name = 'StepEntityAdded1704802263985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "step" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "description" character varying NOT NULL, "recipeId" uuid NOT NULL, CONSTRAINT "PK_70d386ace569c3d265e05db0cc7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "step"`);
    }

}
