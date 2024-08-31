import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { CreateMeasuresTable1724783406481 } from "./migrations/1724783406481-CreateMeasuresTable";
import Measure from "../entities/Measure";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  url: process.env.DATABASE_URL,
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  logging: false,
  entities: [Measure],
  migrations: [CreateMeasuresTable1724783406481],
  subscribers: []
});