import { pool } from "../index.js";

async function resetDatabase() {
    try {
        //Drop existing tables if they exists
    await pool.query(`
    DROP TABLE IF EXISTS tasks CASCADE;
    DROP TABLE IF EXISTS daily_tasks CASCADE;
    DROP TABLE IF EXISTS weekly_tasks CASCADE;
    DROP TABLE IF EXISTS completed_tasks CASCADE;
    `
    );

    //create Tasks table 
    await pool.query(`
    CREATE TABLE tasks (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        task_name VARCHAR(255) NOT NULL,
        task_description TEXT,
        task_type  TEXT,
        completed BOOLEAN
    
    )`);

    //create Daily Tasks with task_id as forgein key from the Tasks table.
    //Consider creating a date created and date due with calendar.
    await pool.query(`
    CREATE TABLE daily_tasks (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        task_id INT REFERENCES Tasks(id)
    )`); 



    //create Weekly Tasks with task_id as foriegn key from Tasks table.
    await pool.query(`
    CREATE TABLE weekly_tasks (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        task_id INT REFERENCES Tasks(id)
        
    )`);

    //create completed task
    await pool.query(`
    CREATE TABLE completed_tasks (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        task_id INT REFERENCES Tasks(id)
        
    )`);

    console.log("Database reset successful")



    } catch (error) {
        console.error("Database reset failed: ", error);
    } finally {
        //end the pool
        await pool.end();
    }
}

await resetDatabase();