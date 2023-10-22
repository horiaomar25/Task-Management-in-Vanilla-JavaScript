import { pool } from "../db/index.js";

//Query the database and return all tasks
export async function getTasks() {
  //Define the SQL qiery to fetch all tasks from the 'Tasks' table
  const queryTasks = "SELECT * FROM Tasks";

  //Use the pool object to send the query to the database
  const allTasks = await pool.query(queryTasks);

  // The rows property of the result object contains the retrieved records
  return allTasks.rows;
}

//Query the database and return the task with a matching id or null
export async function getTaskById(id) {
  //Define the SQL query to fetch the task with the specified id from the task table.
  const queryTasksById = "SELECT * FROM Tasks id = $1";

  //Use the pool object to send the query to the database
  //passing the id as a parameter to prevent SQL injection
  const taskId = await pool.query(queryTasksById, [id]);

  // The rows property of the result object contains the retrieved records
  return taskId.rows[0] || null;
}

//Query the database to create a task and return the new task
export async function createTask(tasks){
    // Define the SQL query for inserting a new task into the tasks table.
    const queryNewTask = `
    INSERT INTO Tasks (task_name, task_description, task_type)
    VALUES ($2, $3, &4)
    RETURNING *
    `;

    // Use the pool object to send the query to the database
    const newTask = await pool.query(queryNewTask, [
        tasks.id,
        tasks.task.name,
        tasks.task_description,
        tasks.task_type
    ]);

    //The rows property of the result object contains the inserted record.
    return newTask.rows[0];
}

//Define the SQL query for updating the specified task in the Tasks table
export async function updateTaskById (id, updates){
    const queryTask = `
    UPDATE Tasks
    SET task_name = COALESCE($1, task_name), 
        task_description = COALESCE($2, task_description),
        task_type = COALESCE($3, task_type)
    `;
     
    // Use the pool object to send the query to the database 
    const updateTask = await pool.query(queryTask, [
        updates.task_name,
        updates.task_description,
        updates.task_type
    ]);

    //The rows property of the result object contains the updated record
    return updates.rows[0] || null;
}

//Query to delete Task by Id and return the delete author or null
