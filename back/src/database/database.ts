import { Sequelize } from "sequelize-typescript";
import "dotenv/config";
import signale from "signale";
import mysql from "mysql2/promise";
import { Domicilio } from "../models/domicilio";
import { Estado } from "../models/estados";
import { Municipio } from "../models/municipios";
import { User } from "../models/user";
import { seedEstadosMunicipios } from "./seeder/estadosMunicipiosSeeder";

const DB_NAME = process.env.DB_NAME!;
const DB_USER = process.env.DB_USER!;
const DB_PASSWORD = process.env.DB_PASSWORD!;
const DB_HOST = process.env.DB_HOST || "localhost";

async function createDatabaseIfNotExists() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    signale.success(`Base de datos "${DB_NAME}" verificada o creada.`);
    await connection.end();
  } catch (error) {
    signale.error("Error al verificar o crear la base de datos:", error);
    process.exit(1);
  }
}

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  dialect: "mysql",
  models: [Municipio, Estado, User, Domicilio,],
  logging: false,
});

export async function initializeDatabase() {
  await createDatabaseIfNotExists();
  try {
    await sequelize.authenticate();
    signale.success("Conexión establecida correctamente.");
    await sequelize.sync({ force: false });

    const count = await Estado.count();
    if (count === 0) {
      await seedEstadosMunicipios(sequelize);
    }
  } catch (err) {
    signale.error("No se pudo conectar a la base de datos:", err);
    process.exit(1);
  }
}

export default sequelize;
