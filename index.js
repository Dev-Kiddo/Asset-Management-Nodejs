import express from "express";
import employeeRoute from "./routes/employeeRoutes.js";
import error from "./middlewares/error.js";

const app = express();

app.use(express.json());

app.use("/api", employeeRoute);

// Err Middleware Express
app.use(error);

export default app;
