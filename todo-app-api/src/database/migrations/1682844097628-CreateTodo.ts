import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTodo1682844097628 implements MigrationInterface {
  name = 'CreateTodo1682844097628';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`deletedAt\` datetime(6) NULL, INDEX \`IDX_1e982e43f63a98ad9918a86035\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_1e982e43f63a98ad9918a86035\` ON \`todo\``,
    );
    await queryRunner.query(`DROP TABLE \`todo\``);
  }
}
