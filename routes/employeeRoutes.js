import express from "express";
import { addEmployee, fetchEmployees, updateEmployee } from "../controllers/employeeController.js";

const route = express.Router();

route.get("/employees", fetchEmployees);
route.post("/employees", addEmployee);
route.put("/employees/:id", updateEmployee);

export default route;
