import express from "express";
import morgan from "morgan";

import { tasksRoutes } from "./routes/taskRoute";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/books", tasksRoutes);
