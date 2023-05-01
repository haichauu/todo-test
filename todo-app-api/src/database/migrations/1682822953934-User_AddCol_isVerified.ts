import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddColIsVerified1682822953934 implements MigrationInterface {
  name = 'UserAddColIsVerified1682822953934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`isVerified\` tinyint NOT NULL DEFAULT 1`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isVerified\``);
  }
}
