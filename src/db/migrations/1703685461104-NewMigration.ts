import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1703685461104 implements MigrationInterface {
  name = 'NewMigration1703685461104';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_addresses" DROP CONSTRAINT "FK_3d7fbb314ae1c5612cefb73742c"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isDeleted"`);
    await queryRunner.query(
      `ALTER TABLE "delivery_addresses" ADD CONSTRAINT "FK_3d7fbb314ae1c5612cefb73742c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_addresses" DROP CONSTRAINT "FK_3d7fbb314ae1c5612cefb73742c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_addresses" ADD CONSTRAINT "FK_3d7fbb314ae1c5612cefb73742c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
