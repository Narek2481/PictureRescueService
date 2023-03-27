import express from "express";
import middleware from "./middleware/middleware.js";
import { route } from "./routes/route.js";
import { sequelize } from "./data_base/db.js"

const app = express();

middleware(app);
app.use(route);
app.listen(4000, () => console.log("server started in 4000 port"));