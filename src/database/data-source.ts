import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { CreateMeasuresTable1724783406481 } from "./migrations/1724783406481-CreateMeasuresTable";
import DbMeasure from "./EntitieDbMeasure";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST ?? "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER ?? "shoppe",
  password: process.env.POSTGRES_PASSWORD ?? "passShoppE",
  database: process.env.POSTGRES_DATABASE ?? "dbShopee",
  synchronize: true,
  logging: false,
  entities: [DbMeasure],
  migrations: [CreateMeasuresTable1724783406481],
  subscribers: [],
  ssl: true
});