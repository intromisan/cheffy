import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1704447541265 implements MigrationInterface {
    name = 'InitialMigration1704447541265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "macronutrients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "calories" integer NOT NULL, "carbonhydrates" real NOT NULL, "cholesterol" real NOT NULL, "fats" real NOT NULL, "fiber" real NOT NULL, "proteins" real NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f160039519e2adaca8cc861dadf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grocery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "isOfficial" boolean NOT NULL DEFAULT false, "macronutrientsId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_b2be664a60d01c4a042b110103" UNIQUE ("macronutrientsId"), CONSTRAINT "PK_5d6e3f6a4ee62fe0379b6f94858" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "FK_b2be664a60d01c4a042b110103d" FOREIGN KEY ("macronutrientsId") REFERENCES "macronutrients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "FK_b2be664a60d01c4a042b110103d"`);
        await queryRunner.query(`DROP TABLE "grocery"`);
        await queryRunner.query(`DROP TABLE "macronutrients"`);
    }

}
