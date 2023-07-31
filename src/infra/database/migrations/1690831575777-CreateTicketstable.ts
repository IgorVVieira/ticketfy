import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTicketstable1690831575777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: "tickets",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "event_id",
            type: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "payment_id",
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
            name: "tickets_events",
            referencedTableName: "events",
            referencedColumnNames: ["id"],
            columnNames: ["event_id"],
          },
          {
            name: "tickets_users",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
          },
          {
            name: "tickets_payments",
            referencedTableName: "payments",
            referencedColumnNames: ["id"],
            columnNames: ["payment_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tickets");
    await queryRunner.query(`DROP EXTENSION "uuid-ossp"`);
  }
}
