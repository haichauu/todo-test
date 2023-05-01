import { MigrationInterface, QueryRunner } from "typeorm";

export class UserModifyColUserId1682829330604 implements MigrationInterface {
    name = 'UserModifyColUserId1682829330604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`verification\` ADD \`type\` varchar(32) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`verification\` DROP COLUMN \`type\``);
    }

}
