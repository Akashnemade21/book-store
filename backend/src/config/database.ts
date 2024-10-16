import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let dbName = process.env.DATABASE_NAME || "db1";
let dbUser = process.env.DATABASE_USER || "root";
let dbPass = process.env.DATABASE_PASS;
let dbHost = process.env.DATABASE_HOST;

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "mysql",
});
