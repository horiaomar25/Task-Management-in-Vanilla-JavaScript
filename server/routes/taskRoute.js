import express from "express";

import * as taskController from "../controllers/tasks-Controller";

export const tasksRoutes = express.Router();

tasksRoutes.get("/tasks", taskController.getTasks);

tasksRoutes.get("tasks/:id", taskController.getDailyTaskById);

tasksRoutes.get("tasks/:id", taskController.getWeeklyTaskById);

tasksRoutes.post("tasks/", taskController.createTask);

tasksRoutes.patch("tasks/:id", taskController.updateTaskById);

tasksRoutes.delete("tasks/:id", taskController.deleteTaskById);
