import express from "express";
import employeeRoute from "./routes/employeeRoutes.js";
import error from "./middlewares/error.js";
import morgan from "morgan";

const app = express();
app.set("query parser", "extended"); // this is required while parsing query

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", employeeRoute);

// Err Middleware Express
app.use(error);

export default app;
