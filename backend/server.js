import express from  "express";
import "dotenv/config";
import cors from "cors"
import http from "http";
import { connectDB } from "./lib/db.js";


const app = express();
const  server =  http.createServer(app)

app.get("/",(req,res)=>{
    console.log(`Hello  Python`)
    res.send("Hello Python");
})

app.use(express.json({limit: "4mb"}));
app.use(cors());

const PORT = process.env.PORT || 5000

await connectDB();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default server;

