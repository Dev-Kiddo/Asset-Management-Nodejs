import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      default: null,
    },
    department: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "inactive",
    },
  },
  { timestamps: true }
);

export const employeeModel = mongoose.model("employee", employeeSchema);
