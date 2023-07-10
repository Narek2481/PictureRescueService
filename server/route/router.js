import multer from "multer";
import express from "express";

import { registrationSubmitController } from "../controllers/controllerRegistrationSubmit.js";
import { imagePushcontroller } from "../controllers/controllerImagePush.js";
import controllerShareData from "../controllers/controllreShare.js";
import { categoryController } from "../controllers/controllerImageCategory.js";
import controllreNotificationData from "../controllers/controllreNotification.js";
import controllerAvatarPush from "../controllers/controllerAvatarPush.js";
import { auth } from "../middlewares/auth-middleware.js";
import { refresh } from "../tokenWork/RefreshToken.js";
import loginSubmitController from "../controllers/controllerLogin.js";
import { imageLoudeForDataBase, imageLoudeForDataBaseForCategory } from "../services/imageService.js";
import adecryptPassword from "../middlewares/decriptPassword.js";
import getUserDataControler from "../controllers/getUserDataControler.js";
import getAvatarController from "../controllers/getAvatarController.js";
import putUserDataController from "../controllers/putUserDataController.js";
import logoutcontroller from "../controllers/LogoutController.js";
import imageLoudeController from "../controllers/imageLoudeController.js";
import deletePrivetImageController from "../controllers/deletePrivetImageController.js";



const upload = multer({ dest: './img' });
const upload2 = multer({ dest: './avatar' });


const router = express.Router();
// root route -----------------------------------------------------------------------------------
router.get("/", async (req, res) => {

    res.send("ok");
});

// registrationSubmit route -----------------------------------------------------------------------------------
router.post("/api/user/registrationSubmit", adecryptPassword, registrationSubmitController);
// login submit route -----------------------------------------------------------------------------------
router.post("/api/user/loginSubmit", adecryptPassword, loginSubmitController);
// Logaut----------------------------------------------------------------------------------------------
router.get("/api/user/logout", logoutcontroller);
// image push route -----------------------------------------------------------------------------------
router.post("/api/imagePush", auth, upload.single('image'), imagePushcontroller);
// image loud route -----------------------------------------------------------------------------------
router.get("/api/imageLoud", imageLoudeController);
// avatarPush route -----------------------------------------------------------------------------------
router.post("/api/avatar", auth, upload2.single('avatar'), controllerAvatarPush);
// image category route -----------------------------------------------------------------------------------
router.post("/api/imageCategory", categoryController);
// share -----------------------------------------------------------------------------------------
router.post("/api/share", auth, controllerShareData);
// getNotification -----------------------------------------------------------
router.post("/api/getNotification", auth, controllreNotificationData);
// refresh -------------------------------------------------------------------------------
router.get('/api/user/refresh', refresh);
// getUserData -----------------------------------------------------------------------------
router.get('/api/getUserData', auth, getUserDataControler);
// getAvatar ------------------------------------------------------------------
router.get("/api/getAvatar", auth, getAvatarController);
// putUserData ------------------------------------------------
router.put("/api/user/putUserData", auth, adecryptPassword, putUserDataController);
// deletePrivetImage
router.delete("/api/deletePrivetImage", auth, deletePrivetImageController);

export { router };