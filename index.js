import express from "express";
import employeeRoute from "./routes/employeeRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", employeeRoute);

export default app;
