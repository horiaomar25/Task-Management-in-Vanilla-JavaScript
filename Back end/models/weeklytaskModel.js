 //Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "../db/index.js";

//When I click on my task card I want to see my task in full.

export async function getWeeklyTaskById(id) {
    //Query the database and return the author with a matching id or null
    // Define the SQL query to fetch the author with the specified id from the 'tasks'
    const queryText = "SELECT * FROM tasks WHERE id = $1 AND task_type='Weekly'";


    // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
    const result = await pool.query(queryText, [id]);

    // The rows property of the result object contains the retrieved records
  return result.rows[0] || null;
}

//When I want to update my task in my daily column.

export async function deleteById (id) {
  //Query the database to delete a book and return the deleted task.
  
  const queryDailyTask = `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING *;
  `;

  // Parameterize the query to prevent SQL injection
  // Use the pool object to send the query to the dataabse
  const result = await pool.query(queryTask, [id]);

  return result.rows[0] || null;

}