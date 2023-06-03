import multer from "multer";
import express from "express";

import { registrationSubmitController } from "../controllers/controllerRegistrationSubmit.js";
import { imagePush } from "../controllers/controllerImagePush.js";
import controllreShare from "../controllers/controllreShare.js";
import { imageCategorySearchInDataBase, imageCategorySearchInDataBaseNesting } from "../controllers/controllerImageCategory.js";
import controllreNotificationData from "../controllers/controllreNotification.js";
import controllerAvatarPush from "../controllers/controllerAvatarPush.js";
import { auth } from "../middlewares/auth-middleware.js";
import { refresh } from "../tokenWork/RefreshToken.js";
import loginSubmitController from "../controllers/controllerLogin.js";
import { logout } from "../services/loginRegisterService.js";
import { imageLoudeForDataBase, imageLoudeForDataBaseForCategory } from "../services/imageService.js";
import adecryptPassword from "../middlewares/decriptPassword.js";
import getUserDataControler from "../controllers/getUserDataControler.js";
import getAvatarController from "../controllers/getAvatarController.js";


const upload = multer({ dest: './img' });
const upload2 = multer({ dest: './avatar' });


const router = express.Router();
// root route -----------------------------------------------------------------------------------
router.get("/", async (req, res) => {

    res.send("ok"); getNotification
});

// registrationSubmit route -----------------------------------------------------------------------------------
router.post("/api/user/registrationSubmit",adecryptPassword, registrationSubmitController);



// login submit route -----------------------------------------------------------------------------------
router.post("/api/user/loginSubmit",adecryptPassword, loginSubmitController);


// Logaut----------------------------------------------------------------------------------------------
router.get("/api/user/logout", async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        await logout(refreshToken)

        res.clearCookie("refreshToken", { path: "/" });
        res.status(200);
        res.end()
    } catch (e) {
        res.send(e)
    }
}
);
// image push route -----------------------------------------------------------------------------------
router.post(
    "/api/imagePush", auth, upload.single('image'), async (req, res) => {
        console.log(req.user, "req.userreq.user")
        await imagePush(req, res);
    }
);
// image loud route -----------------------------------------------------------------------------------
router.get("/api/imageLoud", async (req, res) => {
    try {
        const imageObjArr = await imageLoudeForDataBase(req);
        // console.log(imageObjArr, "Examination")
        if (req.query.categoryValue !== "All") {
            const imageData = await imageLoudeForDataBaseForCategory(req);
            return res.send([imageData]);
        }
        res.send([imageObjArr]);
    } catch (e) {
        res.send(e);
    }
});

// avatarPush route -----------------------------------------------------------------------------------
router.post("/api/avatar", auth, upload2.single('avatar'), async (req, res) => {
    await controllerAvatarPush(req,res);
});
// image category route -----------------------------------------------------------------------------------
router.post("/api/imageCategory", async (req, res) => {
    try {
        if (req.body.category) {
            console.log(66669);
            const categoryDataSend = await imageCategorySearchInDataBaseNesting(req.body.category);
            res.send([[categoryDataSend[0]], categoryDataSend[1], categoryDataSend[2]]);
        } else {
            const categoryDataSend = await imageCategorySearchInDataBase(req);
            res.send([[categoryDataSend[0]], categoryDataSend[1]]);
        }
    } catch (e) {
        res.send(e);
    }

});


// share -----------------------------------------------------------------------------------------
router.post("/api/share", auth, async (req, res) => {
    const data = await controllreShare(req);
    console.log(data, "shdhha")
    res.send("ok");
});

// getNotification -----------------------------------------------------------
router.post("/api/getNotification", auth, controllreNotificationData);
// refresh -------------------------------------------------------------------------------
router.get('/api/user/refresh', refresh);
// getUserData -----------------------------------------------------------------------------
router.get('/api/getUserData',auth,getUserDataControler);
// getAvatar ------------------------------------------------------------------
router.get("/api/getAvatar",auth,getAvatarController);

export { router };