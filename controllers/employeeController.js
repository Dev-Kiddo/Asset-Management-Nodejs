import { employeeModel } from "../models/employeeModel.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const fetchEmployees = asyncHandler(async function (req, res, next) {
  let employees;

  console.log(req.query);

  if (Object.keys(req.query).length > 0) {
    if (req.query.status) {
      employees = await employeeModel.find({ status: req.query.status });

      console.log("employeeStatus:", employees);

      return res.status(200).json({
        success: true,
        message: "Fetch employees successfully",
        employees,
      });
    } else if (req.query.search) {
      employees = await employeeModel.findOne({ name: req.query.search });
      console.log("employeeSearch:", employees);

      return res.status(200).json({
        success: true,
        message: "Fetch employees successfully",
        employees,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Fetch employees failed",
        employees,
      });
    }
  } else {
    employees = await employeeModel.find({});

    if (employees.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Employees not found",
      });
      // return next(new AppError("No employees found", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Fetch employees successfully",
      employees,
    });
  }
});

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

  const newEmployee = new employeeModel({ name, department, gender, status: "active" });

  // console.log("newEmployee:", newEmployee);

  await newEmployee.save();

  return res.status(201).json({
    success: true,
    message: "employee added into list",
  });
};

export const updateEmployee = async function (req, res, next) {
  const { id } = req.params;

  // console.log("id:", id);
  console.log("body", req.body);

  const employee = await employeeModel.findById(id);

  if (!employee) {
    return res.status(400).json({
      success: false,
      message: "Employee not found",
    });
  }

  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Update fields are empty",
    });
  }

  const updateEmployee = await employeeModel.findByIdAndUpdate(id, req.body, { new: true });

  return res.status(200).json({
    success: true,
    message: "Update employee successfully",
    employee: updateEmployee,
  });
};
