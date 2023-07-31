import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserPermissionsTable1690830593586
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: "user_permissions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "permission_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "user_permissions_user",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
          },
          {
            name: "user_permissions_permission",
            referencedTableName: "permissions",
            referencedColumnNames: ["id"],
            columnNames: ["permission_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_permissions");
    await queryRunner.query(`DROP EXTENSION "uuid-ossp"`);
  }
}
