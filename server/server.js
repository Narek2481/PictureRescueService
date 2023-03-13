import express from "express";
// import path from "path"
// import bp from "body-parser";
import cors from "cors";
import true_email from "./true_email.js"

const images = [
    {
        image_url: "1559455754_1.jpg"
    },
    {
        image_url: "1586162565_2.jpg"
    },
    {
        image_url: "download.jpeg"
    },
    {
        image_url: "i.webp"
    },
    {
        image_url: "images.jpeg"
    },
    {
        image_url: "kartinka_motivatsiya_tsitata_9.jpg"
    }
];
const select = [
    {
        value: "poxos"
    },
    {
        value: "hopar"
    },
    {
        value: "chgitem"
    },
    {
        value: "anhayt"
    },
    {
        value: "errrr"
    },
];


const app = express();
// console.log(images)
app.use(express.static("./client/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.listen(4000);
app.get("/", (req, res) => {
    console.log(req.body);
    res.send("ok");
});
app.get("/image_loud", (req, res) => {
    console.log(req.body);
    res.send(images);
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
app.get("/image_get", (req, res) => {
    console.log(req.body)
    res.send(select);
});