import express from  "express";
import "dotenv/config";
import cors from "cors"
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import mongoose from "mongoose";


const app = express();
const  server =  http.createServer(app)

app.use(express.json({limit: "4mb"}));
app.use(cors());

app.get("/",(req,res)=>{
    console.log(`Hello  Python`)
    res.send("Hello Python");
})

// API Routes
app.use("/api/auth", userRouter);

const PORT = process.env.PORT || 5000

await connectDB();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connection.once("open", () => {
  console.log("Connected to DB:", mongoose.connection.host);
});


export default server;
