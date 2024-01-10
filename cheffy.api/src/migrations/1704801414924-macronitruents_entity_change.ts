import { MigrationInterface, QueryRunner } from "typeorm";

export class MacronitruentsEntityChange1704801414924 implements MigrationInterface {
    name = 'MacronitruentsEntityChange1704801414924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "FK_b2be664a60d01c4a042b110103d"`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "FK_b2be664a60d01c4a042b110103d" FOREIGN KEY ("macronutrientsId") REFERENCES "macronutrients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grocery" DROP CONSTRAINT "FK_b2be664a60d01c4a042b110103d"`);
        await queryRunner.query(`ALTER TABLE "grocery" ADD CONSTRAINT "FK_b2be664a60d01c4a042b110103d" FOREIGN KEY ("macronutrientsId") REFERENCES "macronutrients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
