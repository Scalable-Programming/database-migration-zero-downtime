import { postgresClient } from "./index";
import format from "pg-format";

interface UserProps {
  createdAt?: Date;
  userId: string;
  name: string;
}

export const insertPostgresUser = async (
  users: UserProps[],
  includeCreatedAt = false,
  raiseOnError = false
) => {
  let query = format(
    `INSERT INTO users ${
      includeCreatedAt ? "(user_id, name, created_at)" : "(user_id, name)"
    } values %L ON CONFLICT DO NOTHING;`,
    users.map(({ name, userId, createdAt }) =>
      includeCreatedAt ? [userId, name, createdAt] : [userId, name]
    )
  );

  try {
    await postgresClient.query(query);
  } catch (error) {
    console.log("Error getting postgres users", error);

    if (raiseOnError) {
      throw new Error("Error inserting postgres users");
    }
  }
};
