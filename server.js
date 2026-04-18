import app from "./src/app.js";
import dotenv from "dotenv";
import db from "./src/db/db.js";
dotenv.config();

db();

app.listen(3000, (req, res) => {
  console.log("server started!");
});
