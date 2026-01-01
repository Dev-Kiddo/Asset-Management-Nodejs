import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
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
  active: {
    type: Boolean,
    default: false,
  },
});

export const employeeModel = mongoose.model("employee", employeeSchema);
