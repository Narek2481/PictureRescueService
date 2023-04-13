import express from "express";
import { router } from "./routes/route.js";
// import { sequelize } from "./data_base/db.js"
import path from "path";
import cors from "cors";
import cookie_parser from "cookie-parser";
import { sequelize } from "./data_base/db.js";
import  jwt  from "jsonwebtoken";
// import { Public, Image, User, Announcement, Category } from "./data_base/tables.js";


sequelize.authenticate()
    .then(() => console.log("all ok"));

const app = express();

app.use(cookie_parser());
app.use(express.static(path.resolve("./server/img")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(4000, () => console.log("server started in 4000 port"));