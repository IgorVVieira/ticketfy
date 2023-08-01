import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEventPhotosTable1690831759219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: "event_photos",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "eventId",
            type: "uuid",
          },
          {
            name: "url",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "event_photos_events",
            referencedTableName: "events",
            referencedColumnNames: ["id"],
            columnNames: ["eventId"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("event_photos");
    await queryRunner.query(`DROP EXTENSION "uuid-ossp"`);
  }
}
