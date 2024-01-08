import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfileEntityAdded1704713090221 implements MigrationInterface {
    name = 'ProfileEntityAdded1704713090221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "profileName" character varying(255) NOT NULL, "fridgeId" uuid, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fridge" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_33f0174dd80e03538a1ca9e82a4" FOREIGN KEY ("fridgeId") REFERENCES "fridge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_33f0174dd80e03538a1ca9e82a4"`);
        await queryRunner.query(`ALTER TABLE "fridge" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
