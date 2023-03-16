import express from "express";
import path from "path";
// import bp from "body-parser";
import middleware from "./middleware/middleware.js";
import image_category from "./routes/image_category.js";
import image_loud from "./routes/image_loud.js";
import image_push from "./routes/image_push.js";
import login_submit from "./routes/login_submit.js";
import registration_submit from "./routes/registration_submit.js";
import root_route from "./routes/root.js";




const app = express();
middleware(app);
app.listen(4000);

image_loud(app);
image_category(app);
image_push(app);
login_submit(app);
registration_submit(app);
root_route(app);