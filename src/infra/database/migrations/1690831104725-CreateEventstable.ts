import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEventstable1690831104725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: "events",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "status",
            type: "enum",
            enum: ["CANCELED", "FINISHED", "OPEN", "SOLD_OUT"],
          },
          {
            name: "datetime",
            type: "timestamp",
          },
          {
            name: "location",
            type: "varchar",
          },
          {
            name: "participants_limit",
            type: "integer",
            default: 0,
          },
          {
            name: "unitary_price",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: "avaliable_tickets",
            type: "integer",
            default: 0,
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
            name: "events_users",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("events");
    await queryRunner.query(`DROP EXTENSION "uuid-ossp"`);
  }
}
