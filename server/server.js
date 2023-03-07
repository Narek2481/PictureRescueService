import express from "express";
import path from "path"
import bp from "body-parser";
import cors from "cors";
import true_email from "./true_email.js"

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.listen(4000);
app.get("/" , (req, res) => {
    res.send('ok');
});
app.post("/registr_submit", (req, res) => {
    true_email(req.body.email)
        .then(result => {
            res.send(result);
            console.log(result); // true
        })
        .catch(error => {
            res.send(error);
            console.log(error); // false
        });
    console.log(req.body);
    
});
app.post("/login_submit", (req, res) => {
    console.log(req.body);
    res.send("all good");
});