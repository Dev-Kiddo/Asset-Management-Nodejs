import { employeeModel } from "../models/employeeModel.js";

export const fetchEmployees = async function (req, res, next) {
  const employees = await employeeModel.find({});

  if (employees.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Employees not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Fetch employees successfully",
    employees,
  });
};

export const addEmployee = async function (req, res, next) {
  const { name, department, gender } = req.body;

  if (!name || !department || !gender) {
    return res.status(400).json({
      success: false,
      message: "All fields required",
    });
  }

  const employee = await employeeModel.findOne({ name });

  if (employee) {
    return res.status(400).json({
      success: false,
      message: "employee already in list",
    });
  }

  const newEmployee = new employeeModel({ name, department, gender, active: true });

  console.log("newEmployee:", newEmployee);

  await newEmployee.save();

  return res.status(201).json({
    success: true,
    message: "employee added into list",
  });
};
