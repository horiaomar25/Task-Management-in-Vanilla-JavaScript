import { pool } from "../index.js";

async function resetDatabase() {
    try {
        //Drop existing tables if they exists
    await pool.query(`
    DROP TABLE IF EXISTS tasks CASCADE;
    `);

    // GENERATED means that the ID is generated and you don't need to set it when inserting a record into the DB
    //create Tasks table 
    await pool.query(`
    CREATE TABLE tasks (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        task_name VARCHAR(255) NOT NULL,
        task_description TEXT,
        task_frequency task_type,
        completed BOOLEAN)`);

    console.log("Database reset successful")


    } catch (error) {
        console.error("Database reset failed: ", error);
    } finally {
        //end the pool
        await pool.end();
    }
}

await resetDatabase();