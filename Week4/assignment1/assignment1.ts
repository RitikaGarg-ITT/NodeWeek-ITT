import mongoose from "mongoose";
require("./db/connection");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  rollNo: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("userValue", userSchema);
const createDocument = async () => {
  try {
    const data1 = new userModel({
      name: "john",
      age: 23,
      rollNo: "20EGICS095",
    });
    const data2 = new userModel({
      name: "john doe",
      age: 22,
      rollNo: "20EGICS096",
    });
    const data3 = new userModel({
      name: "ritika",
      age: 21,
      rollNo: "20EGICS097",
    });
    const data4 = new userModel({
      name: "johndoe",
      age: 20,
      rollNo: "20EGICS099",
    });
    const result = await userModel.insertMany([data1, data2, data3, data4]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
const getDocument = async () => {
  const result = await userModel.find();
  console.log(result);
};
const updateDocument = async () => {
  try {
    const result = await userModel.updateOne(
      { _id: "662b525024bc3fa3a8d0cda0" },
      {
        $set: {
          name: "Shree Govind",
        },
      }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
const deleteDocument = async () => {
  try {
    const result = await userModel.deleteOne({ _id: "662b08bb1b9e11f365ba1dd2" });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
getDocument();
createDocument();
updateDocument();
deleteDocument();
