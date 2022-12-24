import { postgresClient } from "./index";

const INIT_TABLE = `CREATE TABLE IF NOT EXISTS users (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
  user_id TEXT UNIQUE,
	name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);`;

const UUID_EXTENSION_TEXT = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

const USER_ID_INDEX =
  "CREATE INDEX IF NOT EXISTS  users_user_id ON USERS (user_id)";

export const initUsersTable = async () => {
  try {
    await postgresClient.query(UUID_EXTENSION_TEXT);
    await postgresClient.query(INIT_TABLE);
    await postgresClient.query(USER_ID_INDEX);
  } catch (error) {
    console.log("Error creating table", error);
  }
};
