import { MigrationInterface, QueryRunner } from 'typeorm';

export class VerificationAddColDeletedAt1682824755997
  implements MigrationInterface
{
  name = 'VerificationAddColDeletedAt1682824755997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`verification\` ADD \`expiredAt\` timestamp NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`verification\` ADD \`deletedAt\` datetime(6) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`verification\` DROP COLUMN \`deletedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`verification\` DROP COLUMN \`expiredAt\``,
    );
  }
}
