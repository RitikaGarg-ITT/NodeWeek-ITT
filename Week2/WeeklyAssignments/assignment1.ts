import express, { Request, Response, NextFunction } from "express";
import { User } from "../Interfaces/interfaces";
import { users } from "./utils";

const app: express.Application = express();
app.use(express.json());

const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { username, password }: { username: string; password: string } = req.body;
    const user: User | undefined = users.find((user: User) => user.username === username && user.password === password);
    if (!user) {
      res.status(401).json({ error: "Invalid username / password" });
      return;
    }
    (req as Request & { user?: User }).user = user;
    next();
  } catch (error) {
    next(error);
  }
};

app.post("/login", (req: Request & { user?: User }, res: Response, next: NextFunction): void => {
  try {
    authenticateUser(req, res, () => {
      if (!req.user) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
      }
      res.json({ message: `Welcome, ${req.user.username}! You are authenticated user.` });
    });
  } catch (error) {
    next(error);
  }
});

app.get("/account", (req: Request & { user?: User }, res: Response, next: NextFunction): void => {
  try {
    authenticateUser(req, res, () => {
      if (!req.user) {
        res.status(500).json({ error: "User not found" });
        return;
      }
      res.json({ message: `Welcome, ${req.user.username}! You are authenticated .` });
    });
  } catch (error) {
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
