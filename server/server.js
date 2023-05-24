import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { sequelize } from "./data_base/db.js";
import { router } from "./routes/route.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";



try {
    dotenv.config();
    const app = express();
    sequelize.authenticate();
    app.set("trust proxy", 1)
    app.use(cookieParser());
    app.use('/img', express.static(path.resolve("./img")));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        credentials: true,
        origin: "http://PictureRescueService.com"
    }));
    app.use(router);
    app.use(errorMiddleware);
    console.log(process.env.SECRET, 777)
    console.log(process.env.PORT, 888);

    app.listen(process.env.PORT || 4000, () => console.log(`server started in ${process.env.PORT || 4000} port`));
} catch (e) {
    console.log(e)
}