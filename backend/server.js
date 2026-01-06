import express from  "express";
import "dotenv/config";
import cors from "cors"
import http from "http";


const app = express();
const  server =  http.createServer(app)

app.get("/",(req,res)=>{
    console.log(`Hello  Python`)
    res.send("Hello Python");
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


export default server;

