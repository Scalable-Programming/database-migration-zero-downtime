import { config } from "../../config";
import { Client } from "pg";

const postgresClient = new Client({
  user: config.dbUsername,
  host: "localhost",
  database: config.database,
  password: config.dbPassword,
  port: 5432,
});

const connect = async () => {
  try {
    await postgresClient.connect();
    console.log("Successfully connected to Mongodb");
  } catch (error) {
    console.log("Error connecting to postgres", error);
  }
};

connect();

export { postgresClient };
