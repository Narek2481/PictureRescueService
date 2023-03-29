import express from "express";
import { route } from "./routes/route.js";
// import { sequelize } from "./data_base/db.js"
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelize } from "./data_base/db.js";
import { Public, Image, User, Announcement, Category } from "./data_base/tables.js";

User.findOne({
    where: {
        id: 1 // Replace with the user ID you want to retrieve
    }
})
    .then(user => {
        console.log(user,"-----------------------------------------------------------------"); // Print the user object to the console
    })
    .catch(error => {
        console.error(error); // Handle any errors that occur during the query
    });



sequelize.authenticate()
    .then(() => console.log("all ok"));
const app = express();

app.use(cookieParser());
app.use(express.static(path.resolve("./server/img")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(route);

app.listen(4000, () => console.log("server started in 4000 port"));