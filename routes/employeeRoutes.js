import express from "express";
import { addEmployee, fetchEmployees } from "../controllers/employeeController.js";

const route = express.Router();

route.get("/employees", fetchEmployees);
route.post("/employees", addEmployee);

export default route;
