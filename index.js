import dotenv from "dotenv";
import express from "express";
import { dbConnection } from "./db_connection.js";
const app = express();
dotenv.config();
dbConnection();

app.use(express.json());


//socket io connection



app.listen(7000, () => {
  console.log("server properly connected");
});
