import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1703350122292 implements MigrationInterface {
  name = 'NewMigration1703350122292';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_22f8f935adecac913b2231119af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_22f8f935adecac913b2231119af" FOREIGN KEY ("defaultDeliveryAddressId") REFERENCES "delivery_addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_22f8f935adecac913b2231119af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_22f8f935adecac913b2231119af" FOREIGN KEY ("defaultDeliveryAddressId") REFERENCES "delivery_addresses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
