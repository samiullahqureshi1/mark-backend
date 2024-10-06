import dotenv from "dotenv";
import express from "express";

import { dbConnection } from "./db_connection.js";

// Create an Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Establish database connection
dbConnection();

// Middleware to parse JSON bodies
app.use(express.json());

// Get the current file's directory


// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // You can customize this message
});

// Start the server
app.listen(5000, () => {
    console.log("Server properly connected on port 5000");
});
