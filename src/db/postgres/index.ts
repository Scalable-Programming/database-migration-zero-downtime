import { config } from "../../config";
import { initUsersTable } from "./initUsers";
import { Client } from "pg";

const postgresClient = new Client({
  user: config.dbUsername,
  host: "localhost",
  password: config.dbPassword,
  port: 5432,
});

const connect = async () => {
  try {
    await postgresClient.connect();
    initUsersTable();

    console.log("Successfully connected to postgres");
  } catch (error) {
    console.log("Error connecting to postgres", error);
  }
};

connect();

export { postgresClient };
