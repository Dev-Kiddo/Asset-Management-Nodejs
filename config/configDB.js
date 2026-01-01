import mongoose from "mongoose";

const connectDB = async function () {
  try {
    const connect = await mongoose.connect("mongodb+srv://devryanhere_db_user:bgPDgdhYZmfUcaJe@practice.gly2whj.mongodb.net/asset_management?appName=Practice");
    return connect;
  } catch (error) {
    return error;
  }
};

export default connectDB;
