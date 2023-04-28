import multer from "multer";
import { Public, Image, User, Announcement, Category } from "../data_base/tables.js";
import express from "express";
import { generateVerificationToken, tokenVerify } from "../tokenWork/tokenCreater.js";
import { preparationRegistrationSubmit } from "./functionsForRoutes/preparationRegistrationSubmit.js";
import { checkDatabaseUser, imageLoudeForDataBase } from "../data_base/queryInDataBase.js";
import { imagePush } from "./functionsForRoutes/preparationImagePush.js";
import session, { Session } from "express-session";
import cookieParser from "cookie-parser";

const tokenExamination = async cookies => {
    try {
        console.log(77788)
        if (Object.keys(cookies).length > 0) {
            const tokenE = await tokenVerify(cookies.login)
            return tokenE;
        } else {
            return false;
        }
    } catch (e) {
        return String(e);
    }

    console.log(tokenExmen, 666);
}

//  {
//     domain: 'http://localhost:3000',
//     path: '/'
//     // expires: new Date(Date.now() + 900000)
// }
const router = express.Router();
// root route -----------------------------------------------------------------------------------
router.get("/", async (req, res) => {

    req.session.cookieName = "11"
    res.send("ok");
});

// registrationSubmit route -----------------------------------------------------------------------------------
router.post("/registrationSubmit", async (req, res) => {
    const data = await preparationRegistrationSubmit(req.body);
    console.log(data, "--------------------------")
    if (typeof data === "object") {
        res.status(200)
        res.send(data)
    } else {
        res.status(400);
        res.send(data)
    }
});



// login submit route -----------------------------------------------------------------------------------
router.post("/loginSubmit", async (req, res) => {
    console.log(req.body)
    const result = await checkDatabaseUser(req.body);
    if (result === "password is not correct") {
        res.status(400).json("password is not correct");
    } else if (result === "Something went wrong") {
        res.status(400).json("Something went wrong");
    } else {
        console.log(result.id, "result")
        const token = await generateVerificationToken(result.id);
        // res.session.cookie('login', { token, name: result.name }, { maxAge: 900000, path: '/' });
        const cookieValue = { token, name: result.name }

        req.session.login = cookieValue
        res.status(200).json({ token, name: result.name });
    }

    // res.end
});


// image push route -----------------------------------------------------------------------------------
const upload = multer({ dest: './img' });

router.post(
    "/imagePush", upload.single('image'), imagePush
);
// image loud route -----------------------------------------------------------------------------------
router.post("/image_loud", async (req, res) => {
    cookieParser.signedCookie(req.cookies['connect.sid'], process.env.SECRET)
    console.log(cookieParser.signedCookie(req.cookies['connect.sid'], process.env.SECRET),5252);
    const Examination = await tokenExamination(req.cookies);

    const imageObjArr = await imageLoudeForDataBase(req)
    console.log(imageObjArr, "Examination")
    res.send([imageObjArr, Examination])
});

// avatarPush route -----------------------------------------------------------------------------------
router.post("/avatarPush", async (req, res) => {
    res.send("ok");
});



// image category route -----------------------------------------------------------------------------------
const imageCategorySearchInDataBase = async () => {
    try {
        const categoryInDataBase = await Category.findAll({
            where: {
                parent: null
            }
        });
        const newDataInaCategory = categoryInDataBase.map(elem => {
            return { id: elem.id, name: elem.name };
        });
        console.log(newDataInaCategory, 1111111111111111111)
        return newDataInaCategory;
    } catch (e) {
        console.log(e)
        return "eror Something went wrong"
    }
}
const imageCategorySearchInDataBaseNesting = async category => {
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
        }
    })
    console.log(currentCategory, 1111)
    console.log(categoryInDataBase, 2222)
    // console.log(imageDataInDb, 3333)

    const categoryForSend = categoryInDataBase.map((elem) => {
        return { id: elem.id, name: elem.name };
    })
    return categoryForSend
}

router.post("/imageCategory", async (req, res) => {
    console.log(req.cookies, 1122);

    try {

        if (req.body.category) {
            const categoryDataSend = await imageCategorySearchInDataBaseNesting(req.body.category);
            res.send([categoryDataSend])
        } else {
            const categoryDataSend = await imageCategorySearchInDataBase()
            res.send([categoryDataSend]);
        }
    } catch (e) {
        res.send(e)
    }

});



export { router };