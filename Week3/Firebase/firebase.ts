const admin = require("firebase-admin");
require("dotenv").config();
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./first-assignment-99ab9-firebase-adminsdk-vigov-ea6b693df0.json");
const express = require("express");
import { Request, Response } from "express";
const app = express();
app.use(express.json());
import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { UserData } from "../Interfaces/interfaces";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = getFirestore();

app.post("/create", async (req: Request, res: Response) => {
  try {
    const id = req.body.email;
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const response = await db.collection("users").add(userJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.get("/read/all", async (req: Request, res: Response) => {
  try {
    const userData = await db.collection("users").get();
    const userDataArr: UserData[] = [];
    userData.forEach((doc: QueryDocumentSnapshot) => {
      userDataArr.push(doc.data() as UserData);
    });
    res.send(userDataArr);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/read/:id", async (req: Request, res: Response) => {
  try {
    const userData = await db.collection("users").doc(req.params.id).get();
    res.send(userData.data());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/update", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const updatedName = "NodeJSIsHard";
    const userData = await db.collection("users").doc(id).update({
      firstName: updatedName,
    });
    res.send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/delete", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    await db.collection("users").doc(id).delete();
    res.send("The following user is deleted");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log("server is running on port 3000"));
