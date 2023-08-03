import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

const port = parseInt(process.env.DB_PORT || "5432");

export const AppDataSource = new DataSource({
  type: "postgres",
  url:
    process.env.DATABASE_URL ||
    `postgres://postgres:postgres@localhost:${port}/postgres`,
  logging: false,
  entities: [__dirname + "/entities/*{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
});
