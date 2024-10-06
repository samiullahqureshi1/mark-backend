import dotenv from "dotenv";
import express from "express";
import { dbConnection } from "./db_connection.js";
const app = express();
dotenv.config();
dbConnection();

app.use(express.json());






app.listen(5000, () => {
  console.log("server properly connected");
});
