import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { sequelize } from "./data_base/db.js";
import { router } from "./route/router.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";



try {
    dotenv.config();
    const app = express();
    await sequelize.authenticate();
    app.use(cookieParser());
    app.use('/api/img', express.static(path.resolve("./img")));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        credentials: true,
        origin: "http://PictureRescueService.com"
    }));
    app.use(router);
    app.use(errorMiddleware);
    
    app.listen(process.env.PORT || 4000, () => console.log(`server started in ${process.env.PORT || 4000} port`));
} catch (e) {
    console.log(e)
}