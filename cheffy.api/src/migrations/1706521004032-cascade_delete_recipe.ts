import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeDeleteRecipe1706521004032 implements MigrationInterface {
    name = 'CascadeDeleteRecipe1706521004032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_e50600a62b8ece3b996d58331f4"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_a19a4b507b9e2d1efd2d73b37bc"`);
        await queryRunner.query(`ALTER TABLE "step" ADD CONSTRAINT "FK_e50600a62b8ece3b996d58331f4" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_a19a4b507b9e2d1efd2d73b37bc" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_a19a4b507b9e2d1efd2d73b37bc"`);
        await queryRunner.query(`ALTER TABLE "step" DROP CONSTRAINT "FK_e50600a62b8ece3b996d58331f4"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_a19a4b507b9e2d1efd2d73b37bc" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "step" ADD CONSTRAINT "FK_e50600a62b8ece3b996d58331f4" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
