import { config } from "../../config";
import { Collection, MongoClient } from "mongodb";

let mongoDbCollection: Collection;

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

export { mongoDbCollection };
