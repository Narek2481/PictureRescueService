import multer from "multer";
import express from "express";

import {  generateRefreshToken, generateVerificationToken } from "../tokenWork/tokenCreater.js";
import { preparationRegistrationSubmit } from "./controllers/controllerRegistrationSubmit.js";
import { checkDatabaseUser, imageLoudeForDataBase, imageLoudeForDataBaseForCategory, logout } from "../data_base/queryInDataBase.js";
import { imagePush } from "./controllers/controllerImagePush.js";
import { containsValidNameOrLastName, validateEmail, validatePassword }from "../validatry/validatry.js";
import controllreShare from "./controllers/controllreShare.js";
import { imageCategorySearchInDataBase, imageCategorySearchInDataBaseNesting } from "./controllers/controllerImageCategory.js";
import controllreNotification from "./controllers/controllreNotification.js";
import controllerAvatarPush from "./controllers/controllerAvatarPush.js";
import { auth } from "../middlewares/auth-middleware.js";
import { refresh } from "../tokenWork/RefreshToken.js";
import { ApiError } from "../middlewares/error-middleware.js";


const upload = multer({ dest: './img' });



const router = express.Router();
// root route -----------------------------------------------------------------------------------
router.get("/", async (req, res) => {

    res.send("ok");
});

// registrationSubmit route -----------------------------------------------------------------------------------
router.post("/registrationSubmit", async (req, res) => {
    try {
        const validation = (
            containsValidNameOrLastName(req.body.name, req.body.lastname) &&
            containsValidNameOrLastName(req.body.lastname) &&
            validateEmail(req.body.email) && validatePassword(req.body.password) === "ok"
        );
        if (validation) {
            const data = await preparationRegistrationSubmit(req.body);
            console.log(data, "--------------------------");
            if (typeof data === "object") {
                res.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/" });
                res.cookie('name', data.name, { maxAge: 60 * 60 * 1000, httpOnly: false, path: "/" });
                res.status(200);
                res.send(data);
            } else {
                throw ApiError.BadRequest(data);
            }
        } else {
            throw ApiError.BadRequest(data)
        }
    }
    catch (e) {
        res.send(e);
    }
});



// login submit route -----------------------------------------------------------------------------------
router.post("/loginSubmit", async (req, res) => {
    try {
        if(!(validateEmail(req.body.login) && validatePassword(req.body.password) === "ok")){
            throw ApiError.BadRequest("validation failed")
        }
        console.log(req.body);
        const result = await checkDatabaseUser(req.body);
        if (result === "Password is not correct") {
            throw ApiError.BadRequest("Password is not correct")
        }else if (result === "Email is not correct") {
            throw ApiError.BadRequest("Email is not correct");
        } else {
            const accessToken = await generateVerificationToken(result.id);
            const refreshToken = await generateRefreshToken(req.body.login);
            console.log(accessToken,refreshToken);
            const cookieValue = { refreshToken: refreshToken.refreshToken };
            res.cookie('refreshToken', cookieValue, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/" });
            res.cookie('name', result.name, { maxAge: 60 * 60 * 1000, httpOnly: false, path: "/" });
            console.log(result,"result data")
            res.status(200).json(
                {
                    tokens: { accessToken: accessToken.accessToken }, 
                    name: result.name
                }
            )
        }
    } catch (e) {
        res.send(e);
    }

    // res.end
});


// Logaut----------------------------------------------------------------------------------------------
router.get("/logout", async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        const token = await logout(refreshToken)
        req.clearCookie("refreshToken");
        res.clearCookie("refreshToken");
        res.status(200);
        res.end()
    } catch (e) {
        res.send(e)
    }
}
);
// image push route -----------------------------------------------------------------------------------
router.post(
    "/imagePush",auth, upload.single('image'), async (req, res) => {
        await imagePush(req, res);
    }
);
// image loud route -----------------------------------------------------------------------------------
router.post("/imageLoud", async (req, res) => {
    try {
        const imageObjArr = await imageLoudeForDataBase(req);
        // console.log(imageObjArr, "Examination")
        if (req.body.categoryValue !== "All") {
            const imageData = await imageLoudeForDataBaseForCategory(req);
            return res.send([imageData]);
        }
        res.send([imageObjArr]);
    } catch (e) {
        res.send(e);
    }
});

// avatarPush route -----------------------------------------------------------------------------------
router.post("/avatarPush",auth, upload.single('image'), async (req, res) => {
    const data = await controllerAvatarPush(req)
    res.send(data);
});



// image category route -----------------------------------------------------------------------------------
router.post("/imageCategory", async (req, res) => {
    console.log(req.cookies, 1122);
    console.log(req.body.category, "categoruData");
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
router.post("/share",auth, async (req, res) => {
    const data = await controllreShare(req);
    console.log(data, "shdhha")
    res.send(data);
});

// getNotification -----------------------------------------------------------
router.get("/getNotification",auth, async (req, res) => {
    const data = await controllreNotification(req);
    res.send(data);
})
// refresh -------------------------------------------------------------------------------
router.get('/refresh', refresh);

export { router };