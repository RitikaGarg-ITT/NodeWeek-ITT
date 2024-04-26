import mongoose from "mongoose";
mongoose
  .connect("mongodb://localhost:27017/CRUDoperations")
  .then(() => console.log("connection successfull..."))
  .catch((err) => console.log(err));

  