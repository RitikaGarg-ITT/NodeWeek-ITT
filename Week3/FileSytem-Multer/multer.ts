const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
import { MulterFile } from "../Interfaces/interfaces";
import { Request, Response } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: MulterFile, cb: (error: Error | null, destination: string) => void) {
    return cb(null, "./uploads");
  },
  filename: function (req: Request, file: MulterFile, cb: (error: Error | null, filename: string) => void) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.get("/", (req: Request, res: Response) => {
  return res.render("demo");
});
app.post("/upload", upload.single("profileImage"), (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/ ");
});
app.listen(3000, () => console.log("server is running on port 3000"));
