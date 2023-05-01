import { MigrationInterface, QueryRunner } from "typeorm";

export class VerificationIndexUserId1682841586493 implements MigrationInterface {
    name = 'VerificationIndexUserId1682841586493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`verification\` ADD \`type\` varchar(32) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isVerified\` \`isVerified\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`CREATE INDEX \`IDX_8300048608d8721aea27747b07\` ON \`verification\` (\`userId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8300048608d8721aea27747b07\` ON \`verification\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`isVerified\` \`isVerified\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`verification\` DROP COLUMN \`type\``);
    }

}
