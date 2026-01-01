import mongoose from "mongoose";

const connectDB = async function () {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/asset");
    return connect;
  } catch (error) {
    return error;
  }
};

export default connectDB;
