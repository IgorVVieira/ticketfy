import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePaymentsTable1690831392091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: "payments",
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
            name: "user_account_id",
            type: "uuid",
          },
          {
            name: "value",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: "type",
            type: "enum",
            enum: ["credit", "debit", "pix", "boleto"],
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
            name: "payments_events",
            referencedTableName: "events",
            referencedColumnNames: ["id"],
            columnNames: ["event_id"],
          },
          {
            name: "payments_user_accounts",
            referencedTableName: "user_accounts",
            referencedColumnNames: ["id"],
            columnNames: ["user_account_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("payments");
    await queryRunner.query(`DROP EXTENSION "uuid-ossp"`);
  }
}
