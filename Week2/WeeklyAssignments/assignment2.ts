import express, { Request, Response } from "express";
import { UserData } from "../Interfaces/interfaces";

const app = express();
app.use(express.json());

const users: UserData[] = [
  { id: 1, username: "user1", email: "user1@gmail.com" },
  { id: 2, username: "user2", email: "user1@gmail.com" },
  { id: 3, username: "user3", email: "user3@gmail.com" },
];

app.get("/user/:id", (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);
  const user: UserData | undefined = users.find((user) => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.get("/user/username/:username", (req: Request, res: Response) => {
  const username: string = req.params.username;
  const user: UserData | undefined = users.find((user) => user.username === username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.get("/user/email/:email", (req: Request, res: Response) => {
  const email: string = req.params.email;
  const user: UserData | undefined = users.find((user) => user.email === email);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT: number = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
