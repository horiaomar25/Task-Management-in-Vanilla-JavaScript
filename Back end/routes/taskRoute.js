import express from "express";

import * as taskController from "../controllers/tasks-Controller";

export const tasksRoutes = express.Router();

tasksRoutes.get("/")