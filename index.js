import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import userrouter from "./Routers/user.router.js";
import bookrouter from "./Routers/book.router.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB();
const port = process.env.PORT;
app.use("/api/user", userrouter);
app.use("/api/book", bookrouter);
app.get("/", (req, res) => {
  res.send("Hello, this is your Express API in the port 8080!");
});
app.listen(port, () => {
  console.log("My app is listening in the port");
});
