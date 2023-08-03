import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";

const port = parseInt(process.env.DB_PORT || "5432");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "postgres_mb_labs",
  port,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  entities: [__dirname + "/entities/*{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
});
