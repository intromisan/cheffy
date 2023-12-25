import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1703256884647 implements MigrationInterface {
    name = ' $npmConfigName1703256884647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "macronutrients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "calories" integer NOT NULL, "carbonhydrates" real NOT NULL, "cholesterol" real NOT NULL, "fats" real NOT NULL, "fiber" real NOT NULL, "proteins" real NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f160039519e2adaca8cc861dadf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "macronutrients"`);
    }

}
