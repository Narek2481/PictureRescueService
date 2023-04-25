import express from "express";
import path from "path";
import cors from "cors";
import  dotenv  from "dotenv"
import cookieParser from 'cookie-parser';
import { sequelize } from "./data_base/db.js";
import { router } from "./routes/route.js";

// import { Public, Image, User, Announcement, Category } from "./data_base/tables.js";

try {
    sequelize.authenticate();
    const app = express();
    dotenv.config();
    app.use(cookieParser());
    app.use(express.static(path.resolve("./server/img")));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        credentials:true,
        origin:"http://localhost:3000"
    }));
    app.use(router);
    console.log(process.env.SECRET,777)
    console.log(process.env.PORT,888);
    
    app.listen(process.env.PORT || 4000, () => console.log(`server started in ${process.env.PORT || 4000} port`));
}catch(e){
    console.log(e)
}