import express, { Request, Response, NextFunction } from "express";
import * as path from "path";
const app: express.Application = express();

const logTimestamp = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`Request received at: ${new Date().toISOString()}`);
  next();
};

app.use(logTimestamp);

app.get("/square/:number", (req: Request, res: Response): void => {
  const number: number = parseInt(req.params.number);
  const squareRoot: number = Math.sqrt(number);
  res.render(path.join(__dirname, "views", "result.ejs"), { number, squareRoot });
});

app.use(express.static(path.join(__dirname, "public")));

const PORT: number = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
