import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

type DatabaseCredentials = {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

function getDataBaseCredentials(): DatabaseCredentials {
  return {
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.POSTGRES_DB || 'postgres'
  };
}

const credentials = getDataBaseCredentials();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: credentials.host,
  port: credentials.port,
  username: credentials.user,
  password: credentials.password,
  database: credentials.database,
  logging: true,
  entities: [__dirname + '/entities/*{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}']
});
