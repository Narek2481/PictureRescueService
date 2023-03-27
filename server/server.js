import express from "express";
import middleware from "./middleware/middleware.js";
import { route } from "./routes/route.js";
import { sequelize, User } from "./data_base/db.js"

const app = express();
sequelize.authenticate()
    .then(() => {
        console.log('Connection to database successful');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
sequelize.sync()
    .then(() => {
        console.log('Database tables created');
    })
    .catch((error) => {
        console.error('Error creating database tables:', error);
    });

middleware(app);
app.use(route);
app.listen(4000, () => console.log("server started in 4000 port"));