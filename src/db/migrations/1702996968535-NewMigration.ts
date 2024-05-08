import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1702996968535 implements MigrationInterface {
  name = 'NewMigration1702996968535';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "emailVerificationToken" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "emailVerificationTokenExpires" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "emailVerificationTokenExpires" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "emailVerificationToken" SET NOT NULL`,
    );
  }
}
