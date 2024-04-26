import express, { Request, Response } from "express";
require("../src/db/connection");
const Ranking = require("../src/models/schema");
const app: express.Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello from ritika");
});

app.post("/players", async (req: Request, res: Response) => {
  try {
    const playerData = Ranking(req.body);
    const result = await playerData.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.get("/players", async (req: Request, res: Response) => {
  try {
    const result = await Ranking.find();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/players/:id", async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const result = await Ranking.findById({ _id });
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.patch("/players/:id", async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const result = await Ranking.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.delete("/players/:id", async (req: Request, res: Response) => {
  try {
    const result = await Ranking.findByIdAndDelete(req.params.id);
    res.send({message:"The document is deleted successfully"});
  } catch (err) {
    res.status(500).send(err);
  }
});
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
