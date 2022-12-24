import { config } from "./config";
import { getUsers, insertUser } from "./dataProvider/index";
import express from "express";

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  const lastUserId = req.query.lastUserId;

  const users = await getUsers(lastUserId as string | undefined);

  res.json({ users });
});

app.post("/users", async (req, res) => {
  const { name } = req.body;
  const insertedUserId = await insertUser(name);

  res.json({ insertedUserId });
});

app.listen(config.port, () => console.log("Successfully listening to server"));
