import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1703348310197 implements MigrationInterface {
  name = 'NewMigration1703348310197';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "delivery_addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "landmarkArea" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_138238d6ec62ef07449c2a8fb11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "defaultDeliveryAddressId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_22f8f935adecac913b2231119af" FOREIGN KEY ("defaultDeliveryAddressId") REFERENCES "delivery_addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_addresses" ADD CONSTRAINT "FK_3d7fbb314ae1c5612cefb73742c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "users" DROP COLUMN "defaultDeliveryAddressId"`,
    );
    await queryRunner.query(`DROP TABLE "delivery_addresses"`);
  }
}
