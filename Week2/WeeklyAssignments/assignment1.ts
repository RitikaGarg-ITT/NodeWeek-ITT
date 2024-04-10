import express, { Request, Response, NextFunction } from "express";

interface User {
  id: number;
  username: string;
  password: string;
}

const app: express.Application = express();
app.use(express.json());

const users: User[] = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { username, password }: { username: string; password: string } = req.body;
  console.log(users);
  const user: User | undefined = users.find((user: User) => user.username === username && user.password === password);
  if (!user) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
  (req as Request & { user?: User }).user = user;
  next();
};

app.post("/login", authenticateUser, (req: Request & { user?: User }, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }
  res.json({ message: `Welcome, ${req.user.username}! You are authenticated.` });
});

app.get("/account", authenticateUser, (req: Request & { user?: User }, res: Response): void => {
  if (!req.user) {
    res.status(500).json({ error: "User not found" });
    return;
  }
  res.json({ message: `Welcome, ${req.user.username}! You are authenticated.` });
});

const PORT: number = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
