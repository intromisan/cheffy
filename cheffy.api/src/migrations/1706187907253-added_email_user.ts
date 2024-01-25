import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedEmailUser1706187907253 implements MigrationInterface {
    name = 'AddedEmailUser1706187907253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
