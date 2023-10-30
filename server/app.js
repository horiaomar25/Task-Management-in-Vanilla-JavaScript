import express from "express";
import morgan from "morgan";
import cors from "cors";

import { tasksRoutes } from "./routes/taskRoute.js";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.post('http://localhost:3001/tasks/', (req, res) => {
    const { taskName, taskDescription, taskType } = req.body;
// Validate and save the data to the database here

  // Send a response back to the client
  res.json({ message: 'Data saved successfully' });
});

app.use(cors())

app.use("/tasks", tasksRoutes);
