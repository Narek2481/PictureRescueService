import multer from "multer";
import express from "express";

import { Public, Image, User, Announcement, Category }
    from "../data_base/tables.js";
import { generateVerificationToken, tokenVerify }
    from "../tokenWork/tokenCreater.js";
import { preparationRegistrationSubmit }
    from
    "./controllers/controllerRegistrationSubmit.js";
import { checkDatabaseUser, imageLoudeForDataBase }
    from "../data_base/queryInDataBase.js";
import { imagePush } from "./controllers/controllerImagePush.js";
import { containsValidNameOrLastName, validateEmail, validatePassword }
    from "../validatry/validatry.js";
import controllreShare from "./controllers/controllreShare.js";





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
            console.log(data, "--------------------------")
            if (typeof data === "object") {
                res.status(200)
                res.send(data);
            } else {
                res.status(400);
                res.send(data);
            }
        } else {
            res.status(400);
            res.send("validation failed");
        }
    }
    catch (e) {
        res.send(String(e));
    }
});



// login submit route -----------------------------------------------------------------------------------
router.post("/loginSubmit", async (req, res) => {
    try {

        const validation = validateEmail(req.body.login) && validatePassword(req.body.password) === "ok";
        validation ? "" : res.status(400).send("validation failed");
        console.log(req.body)
        const result = await checkDatabaseUser(req.body);
        if (result === "password is not correct") {
            res.status(400).json("password is not correct");
        } else if (result === "Something went wrong") {
            res.status(400).json("Something went wrong");
        } else {
            console.log(result.id, "result")
            const token = await generateVerificationToken(result.id);
            const cookieValue = { token };
            res.cookie('login', cookieValue, { maxAge: 60 * 60 * 1000, httpOnly: true, path: "/" });
            res.cookie('name', result.name, { maxAge: 60 * 60 * 1000, httpOnly: true, path: "/" });
            res.status(200).json({ auth: true, name: result.name });
        }
    } catch (e) {
        res.send(String(e));
    }

    // res.end
});


// image push route -----------------------------------------------------------------------------------
const upload = multer({ dest: './img' });

router.post(
    "/imagePush", upload.single('image'), async (req, res) => {
        await imagePush(req, res);
    }
);
// image loud route -----------------------------------------------------------------------------------
router.post("/imageLoud", async (req, res) => {
    try {
        const imageObjArr = await imageLoudeForDataBase(req)
        // console.log(imageObjArr, "Examination")
        if (req.body.categoryValue !== "All") {
            return res.send(null)
        }
        res.send([imageObjArr])
    } catch (e) {
        res.send(e)
    }
});

// avatarPush route -----------------------------------------------------------------------------------
router.post("/avatarPush", async (req, res) => {


    res.send("ok");
});



// image category route -----------------------------------------------------------------------------------
const imageCategorySearchInDataBase = async (req) => {
    try {
        const categoryInDataBase = await Category.findAll({
            where: {
                parent: null
            }
        });
        const newDataInaCategory = categoryInDataBase.map(elem => {
            return { id: elem.id, name: elem.name };
        });

        let imagesInDb = await Image.findAll({
            order: [['id']],
            limit: 9
        });
        const imageDataForSend = imagesInDb ? imagesInDb.map((elem) => {
            return {
                imageWidthHeght: elem.width_heght,
                image_url: elem.ref_or_path
            }
        }) : [];

        return [newDataInaCategory, imageDataForSend];
    } catch (e) {
        console.log(e)
        return "eror Something went wrong"
    }
}

const publicExamination = data => {
    try {

    } catch (e) {
        return e
    }
    return
}


const imageCategorySearchInDataBaseNesting = async category => {
    try {

        const limit = 9
        console.log(category, "categoryData")
        if (category === "All") {
            const data = await imageCategorySearchInDataBase()
            return data;
        }
        const currentCategory = await Category.findOne({
            where: {
                name: category
            }
        });
        const categoryInDataBase = await Category.findAll({
            where: {
                parent: currentCategory.id
            }
        });
        const imageDataInDb = await Image.findAll({
            where: {

                category: currentCategory.id
            },
            limit: 9
        })

        console.log(currentCategory, 1111)
        console.log(categoryInDataBase, 2222)
        console.log(585)
        console.log(imageDataInDb, "565")

        const categoryForSend = categoryInDataBase.map((elem) => {
            return { id: elem.id, name: elem.name };
        })
        const imageDataForSend = imageDataInDb ? imageDataInDb.map((elem) => {
            return {
                imageWidthHeght: elem.width_heght,
                image_url: elem.ref_or_path
            }
        }) : [];
        console.log(imageDataForSend, 6666)

        return [categoryForSend, imageDataForSend, limit]
    } catch (e) {
        return e
    }
}
router.post("/imageCategory", async (req, res) => {
    console.log(req.cookies, 1122);
    console.log(process.env.AUTH, "Auth121");
    console.log(req.body.category, "categoruData");
    
    try {
        if (req.body.category) {
            console.log(66669)
            const categoryDataSend = await imageCategorySearchInDataBaseNesting(req.body.category);
            res.send([[categoryDataSend[0]], categoryDataSend[1], req.cookies.loginStatus, categoryDataSend[2]])
        } else {
            const categoryDataSend = await imageCategorySearchInDataBase(req)
            res.send([[categoryDataSend[0]], categoryDataSend[1], req.cookies.loginStatus]);
        }
    } catch (e) {
        res.send(e)
    }

});


// share -----------------------------------------------------------------------------------------
router.post("/share", async (req, res) => {
    const data = await controllreShare(req);
    res.send(data);
});




export { router };