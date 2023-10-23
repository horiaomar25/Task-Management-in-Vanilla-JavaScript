import * as tasksModel from "../models/tasksModel"
import * as dailyTaskModel from "../models/dailytaskModel"
import * as weeklyTaskModel from "../models/weeklytaskModel"

export async function getTasks(req, res) {
    const tasks = await tasksModel.getTasks();
    res.status(200).json({ status: "success", data: tasks });

}

export async function getDailyTaskById(req, res) {
    const id = req.params.id;
    const task = await dailyTaskModel.getDailyTaskById(id);

    if(!task) {
        return res
        .status(404)
        .json({ status: "fail", data: { msg: "Task not found" } });

    }
    res.status(200).json({ status: "success", data: task})
}

export async function createTask(req, res) {
    const data = req.body;
    const task = await tasksModel.createTask(data);
    res.status(201).json({ status: "success", data: task })
}

export async function deleteById (req, res) {
    const 
}



