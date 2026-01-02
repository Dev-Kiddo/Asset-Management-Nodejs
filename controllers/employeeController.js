import { employeeModel } from "../models/employeeModel.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const fetchEmployees = asyncHandler(async function (req, res, next) {
  // Two different ways to make query in Mongoose
  // employees = await employeeModel.find({ status: req.query.status });
  // employees = await employeeModel.find().where("status").equals("active");
  // const queryObject = { ...req.query };

  //? BUILDING THE QUERY
  const queryObject = { ...req.query }; //cloning req.query object

  //* FILTERING
  const excludeFields = ["sort", "page", "limit", "fields"]; //Creating a own array of fields which needs to remove.

  excludeFields.forEach((fields) => delete queryObject[fields]); //removing fields from query object

  console.log("queryObject:", queryObject); // now in the url if any query comes with sort,page, limit,fields label are will be removed in this query object.

  // --------------------------------------------------------

  //* ADVANCED FILTERING
  // in this advance filtering we will do this like less than, greater than like that filtering

  // Filtering like this in URL = http://localhost:8000/api/employees?price[gte]=1000 -[gte,gt,lte,lt] ==> express will parse it like this --> { price: { gte: '1000' } }

  // to make the filter work, we need something ==> $ infront of gte. { price: { '$gte': '1000' } }, so for that using regular expression in replace method to fix it.

  let queryStr = JSON.stringify(queryObject);

  queryStr = JSON.parse(queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`));
  console.log("queryStr:", queryStr); // {price: { '$gte': '1000' }}

  // --------------------------------------------------------

  let query = employeeModel.find(queryObject); //this line will returns a query.
  // here if we add await, then it will return the document matches that query.
  // if we do that, then we can't able to do any pagination or sorting operations here right?

  //* SORTING BY FIELDS
  if (req.query.sort) {
    query = query.sort(req.query.sort);
  }

  //? EXECUTING THE QUERY
  const employees = await query;

  if (employees.length === 0) {
    return res.status(200).json({
      success: false,
      message: "No employees found",
    });
    // return next(new AppError("No employees found", 400));
  }

  //? SEND RESPONSE
  return res.status(200).json({
    success: true,
    message: "Fetch employees successfully",
    employees,
  });
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
