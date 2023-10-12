import { pool } from "../index.js";

async function resetDatabase() {
    try {
        //Drop existing tables if they exists
    await pool.query(`
    DROP TABLE IF EXISTS Tasks CASCADE;
    DROP TABLE IF EXISTS Daily Tasks CASCADE;
    DROP TABLE IF EXISTS Weekly Tasks CASCADE;
    DROP TABLE IF EXISTS Completed Tasks CASCADE;
    `
    );

    //create Tasks table 
    await pool.query(`
    CREATE TABLE Tasks (
        task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        task_name VARCHAR(255) NOT NULL,
        task_description TEXT,
        task_type TEXT,
    
    )`)

    //create Daily Tasks with task_id as forgien key from the Tasks table.


    //create Weekly Tasks with task_id as foriegn key from Tasks table.
    }
}