import { connect } from "../db/mongo";
import { getUsers as getMongoUsers } from "../db/mongo/getUsers";
import { insertPostgresUser } from "../db/postgres/insertUser";

const MIGRATION_DATE = new Date("2022-12-25");

// If migration fails, we can continue where we left
const LAST_USER_ID = undefined;

const migrateUsers = async () => {
  const getMigrationUsers = async (lastUserId?: string) =>
    await getMongoUsers({ limit: 500, lastUserId, createdAt: MIGRATION_DATE });

  let mongoUsers = await getMigrationUsers(LAST_USER_ID);

  while (mongoUsers.length > 0) {
    await insertPostgresUser(
      mongoUsers.map(({ _id, createdAt, name }) => ({
        userId: _id.toHexString(),
        name,
        createdAt: new Date(createdAt),
      })),
      true,
      true
    );

    const lastUserId = mongoUsers.pop()._id.toHexString();

    // If migration fails, we can continue where we left
    console.log(lastUserId);

    mongoUsers = await getMigrationUsers(lastUserId);
  }
};

connect().then(migrateUsers).catch(console.log);
