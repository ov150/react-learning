import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import userRoute from "./routes/auth.routes.js"
import connectDB from "./utils/db.js";
const app = express();
configDotenv()

app.use(express.json());
connectDB();


//profile
//api call

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get("/", (req, res) => {
  console.log("GET request received");
  res.json({ "hello js": "try new" });
});

//http://localhost:3000/api/user
app.use("/api/user", userRoute);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});