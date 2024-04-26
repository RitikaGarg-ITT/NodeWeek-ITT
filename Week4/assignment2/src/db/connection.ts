const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/olympicsPlayer")
  .then(() => {
    console.log("connection successfull");
  })
  .catch(() => {
    console.log("connection unsuccessfull");
  });
