import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1703685630718 implements MigrationInterface {
  name = 'NewMigration1703685630718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_22f8f935adecac913b2231119af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_addresses" DROP CONSTRAINT "FK_3d7fbb314ae1c5612cefb73742c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_22f8f935adecac913b2231119af" FOREIGN KEY ("defaultDeliveryAddressId") REFERENCES "delivery_addresses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_addresses" ADD CONSTRAINT "FK_3d7fbb314ae1c5612cefb73742c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery_addresses" DROP CONSTRAINT "FK_3d7fbb314ae1c5612cefb73742c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_22f8f935adecac913b2231119af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_addresses" ADD CONSTRAINT "FK_3d7fbb314ae1c5612cefb73742c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_22f8f935adecac913b2231119af" FOREIGN KEY ("defaultDeliveryAddressId") REFERENCES "delivery_addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
