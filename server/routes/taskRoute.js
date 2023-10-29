import express from "express";

import * as taskController from "../controllers/tasks-Controller";

export const tasksRoutes = express.Router();

tasksRoutes.get("/", taskController.getTasks);

tasksRoutes.get("/:id", taskController.getDailyTaskById);

tasksRoutes.get("/:id", taskController.getWeeklyTaskById);

tasksRoutes.post("/", taskController.createTask);

tasksRoutes.patch("/:id", taskController.updateTaskById);

tasksRoutes.delete("/:id", taskController.deleteTaskById);
