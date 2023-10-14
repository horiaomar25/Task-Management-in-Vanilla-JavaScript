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
        task_type VAR (50) TEXT,
        completed BOOLEAN
    
    )`);

    //create Daily Tasks with task_id as forgein key from the Tasks table.
    //Consider creating a date created and date due with calendar.
    await pool.query(`
    CREATE TABLE DailyTasks (
        daily_task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        task_id INT REFERENCES Tasks(task_id)

    )`);



    //create Weekly Tasks with task_id as foriegn key from Tasks table.
    await pool.query(`
    CREATE TABLE Weekly Tasks (
        weekly_task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        task_id INT REFERENCES Tasks(task_id)
        
    )`);

    //create completed task
    await pool.query(`
    CREATE TABLE Weekly Completed Tasks (
        completed_task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        task_id INT REFERENCES Tasks(task_id)
        
    )`);

    }
}