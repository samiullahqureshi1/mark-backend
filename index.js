import dotenv from "dotenv";
import express from "express";
import favicon from "serve-favicon";
import { dbConnection } from "./db_connection.js";
const app = express();
dotenv.config();
dbConnection();

app.use(express.json());
app.use(favicon(path.join(__dirname, 'favicon.ico'))); 
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // You can customize this message
});




app.listen(5000, () => {
  console.log("server properly connected");
});
