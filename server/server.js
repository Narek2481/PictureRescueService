import express  from "express";

const app = express();

app.listen(4000,() => console.log("ok port 4000")); 
app.get("/",(req,res) => {
    res.send({name:"Narek"});
});