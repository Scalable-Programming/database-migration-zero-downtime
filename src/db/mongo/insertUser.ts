import { mongoDbCollection } from "./index";

export const insertUser = async (name: string) => {
  const newUser = await mongoDbCollection.insertOne({
    name,
    createdAt: new Date(),
  });

  return newUser.insertedId;
};
