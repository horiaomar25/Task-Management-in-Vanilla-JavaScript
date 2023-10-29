//Import the pg library
import pg from "pg"

//Retrieve the database connection string from enviroment variables
const connectionString = process.env.DB_CONNECTION_STRING;

//Check if the connection string is not defined, and if so, throw an error
if(!connectionString) {
    throw new Error(
        "No connection string defined"
    );
}

//Export a new instance of pg.Pool, which will interact with the Postgre database

export const pool = new pg.Pool({
    //Pass the connection string to the pool, so it knows how to connect to your database
    connectionString,
})