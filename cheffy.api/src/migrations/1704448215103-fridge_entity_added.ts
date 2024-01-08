import { MigrationInterface, QueryRunner } from "typeorm";

export class FridgeEntityAdded1704448215103 implements MigrationInterface {
    name = 'FridgeEntityAdded1704448215103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fridge" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_27ce3d8ff1f4465f90e7c2a9b56" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "fridge"`);
    }

}
