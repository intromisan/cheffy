import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeveralEntitiesAdded1705319771877 implements MigrationInterface {
  name = 'SeveralEntitiesAdded1705319771877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipe_category" ("recipeId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_0259be6182af9c563a28ca399da" PRIMARY KEY ("recipeId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ccd26151b1b1dbc4610aa9143" ON "recipe_category" ("recipeId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_20b2cfc776de9e8424c519d099" ON "recipe_category" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_5ccd26151b1b1dbc4610aa9143a" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_category" ADD CONSTRAINT "FK_20b2cfc776de9e8424c519d0997" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_20b2cfc776de9e8424c519d0997"`,
    );
    await queryRunner.query(
      `ALTER TABLE "recipe_category" DROP CONSTRAINT "FK_5ccd26151b1b1dbc4610aa9143a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_20b2cfc776de9e8424c519d099"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5ccd26151b1b1dbc4610aa9143"`,
    );
    await queryRunner.query(`DROP TABLE "recipe_category"`);
  }
}
