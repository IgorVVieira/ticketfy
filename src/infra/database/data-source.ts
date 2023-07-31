import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserDB } from "./entities/user";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  logging: false,
  synchronize: true,
  entities: [UserDB],
  migrations: ["src/infra/database/migrations/**/*.ts"],
});
