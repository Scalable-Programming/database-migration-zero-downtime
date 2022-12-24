import { getUsers as getMongoDbUsers } from "../db/mongo/getUsers";
import { insertUser as insertMongoUser } from "../db/mongo/insertUser";
import { getPostgresUsers } from "../db/postgres/getUsers";
import { insertPostgresUser } from "../db/postgres/insertUser";

export const getUsers = async (lastUserId?: string) => ({
  mongoUsers: await getMongoDbUsers(lastUserId),
  postgresUsers: await getPostgresUsers(lastUserId),
});

export const insertUser = async (name: string) => {
  const insertedUserId = (await insertMongoUser(name)).toHexString();
  await insertPostgresUser([{ userId: insertedUserId, name }]);

  return insertedUserId;
};
