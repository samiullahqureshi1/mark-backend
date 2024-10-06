import dotenv from "dotenv";
import express from "express";
import favicon from "serve-favicon";
import path from "path"; // Import path to resolve the file path
import { fileURLToPath } from "url"; // Import for getting the current file URL

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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve favicon
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // You can customize this message
});

// Start the server
app.listen(5000, () => {
    console.log("Server properly connected on port 5000");
});
