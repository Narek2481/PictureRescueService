import express from "express";
import { route } from "./routes/route.js";
// import { sequelize } from "./data_base/db.js"
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelize } from "./data_base/db.js";
import { Public, Image, User, Announcement, Category } from "./data_base/tables.js";


sequelize.authenticate()
    .then(() => console.log("all ok"));

// const attempt_to_register = await User.findOne({
//     where: {
//         id: 2
//     }
// });
// console.log(attempt_to_register,"---------------------------------------------------------")
const app = express();

app.use(cookieParser());
app.use(express.static(path.resolve("./server/img")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(route);

app.listen(4000, () => console.log("server started in 4000 port"));