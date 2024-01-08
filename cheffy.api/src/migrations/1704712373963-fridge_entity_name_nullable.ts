import { MigrationInterface, QueryRunner } from "typeorm";

export class FridgeEntityNameNullable1704712373963 implements MigrationInterface {
    name = 'FridgeEntityNameNullable1704712373963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fridge" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fridge" ALTER COLUMN "name" SET NOT NULL`);
    }

}
