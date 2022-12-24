import { config } from "../../config";
import { Collection, MongoClient } from "mongodb";
import { UserSchema } from "./types";


let mongoDbCollection: Collection<UserSchema>;

const connect = async () => {
  const client = new MongoClient(
    `mongodb://${config.dbUsername}:${config.dbPassword}@localhost:27017`
  );

  try {
    await client.connect();
    const db = client.db(config.database);
    mongoDbCollection = db.collection("users");

    console.log("Successfully connected to Mongodb");
  } catch (error) {
    console.log("Error connecting to MongoDb", error);
  }
};

connect();

export { mongoDbCollection, connect };
