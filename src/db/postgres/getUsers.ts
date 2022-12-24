import { postgresClient } from "./index";

export const getPostgresUsers = async (lastUserId?: string) => {
  const text = `SELECT * FROM users ${
    lastUserId ? "WHERE user_id > $1 " : ""
  }ORDER BY user_id LIMIT 10`;

  const values = lastUserId ? [lastUserId] : [];

  try {
    const res = await postgresClient.query(text, values);

    return res.rows;
  } catch (error) {
    console.log("Error getting postgres users", error);
    return null;
  }
};
