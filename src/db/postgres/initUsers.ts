import { postgresClient } from "./index";

const INIT_TABLE = `CREATE TABLE IF NOT EXISTS users (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT,
);`;

const initDb = async () => {
  try {
    await postgresClient.query(INIT_TABLE);
  } catch (error) {
    console.log("Error creating table", error);
  }
};

initDb();
