import multer from "multer";
import fs from "fs";
import bcrypt from "bcrypt";
import { Public, Image, User, Announcement, Category } from "../data_base/tables.js";
import express from "express";
import sharp from "sharp";
import { Op } from 'sequelize';
import { generateVerificationToken,tokenVerify } from "./tokenCreater.js";
import { preparationRegistrationSubmit } from "./functionsForRoutes/preparationRegistrationSubmit.js";
import { checkDatabaseUser, imageLoudeForDataBase } from "../data_base/queryInDataBase.js";
import { imagePush } from "./functionsForRoutes/preparationImagePush.js";


const router = express.Router();
// root route -----------------------------------------------------------------------------------
router.get("/", (req, res) => {
    console.log(res.cookie())
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
        const token = await generateVerificationToken(result.id)
        res.status(200).json({ token, name: result.name });
    }
    res.end
})


// image push route -----------------------------------------------------------------------------------
const publicOrPrivateCreater = async (publicImage, userToken) => {
    try {
        console.log(publicImage, 4444444)
        console.log(userToken, "-------------------")
        const decodedToken = await tokenVerify(userToken, secret);
        const userId = decodedToken.clientId;
        console.log(userId, 55555555555555555555555555555555555)
        const publicTable = await Public.create({
            public: publicImage,
            author: userId
        });
        return publicTable
    } catch (e) {
        console.log(e, 888888888888888888888888888888888888888888888888888888)
        return "eror Something went wrong"
    }
}

const addImageDataInDataBase = async (
    imageData, categoryData, publicImage, userToken
) => {
    try {
        const publicOrPrivateInDataBase = await publicOrPrivateCreater(publicImage, userToken);
        console.log(publicOrPrivateInDataBase)
        const parentCategory = await Category.findOne({
            where: {
                name: categoryData.selectValue
            }
        });

        const CategoryIsEmpty = categoryData.newCategory ? await Category.findOne({
            where: {
                name: categoryData.newCategory
            }
        }) : false;

        const newCategory = {
            name: categoryData.newCategory ? categoryData.newCategory : categoryData.selectValue,
            parent: parentCategory ? parentCategory.id : null
        };

        const newCategoryInDataBase = CategoryIsEmpty ? false : await Category.create(newCategory);

        console.log(publicOrPrivateInDataBase, 22222211111)
        const newImage = {
            ref_or_path: imageData.name,
            width_heght: imageData.imageSizeForDataBase,
            category: newCategoryInDataBase ? newCategoryInDataBase.id : CategoryIsEmpty.id,
            public_or_private: publicOrPrivateInDataBase.id
        };

        await Image.create(newImage);

        return "ok"
    } catch (e) {
        return "eror"
    }
}

const upload = multer({ dest: 'server/img' });

router.post(
    "/imagePush", upload.single('image'), imagePush
);
// image loud route -----------------------------------------------------------------------------------
router.post("/image_loud", async (req, res) => {
    const  imageObjArr = await imageLoudeForDataBase(req)
    console.log(imageObjArr)
    res.send(imageObjArr)
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
    console.log(imageDataInDb, 3333)
    const categoryForSend =  categoryInDataBase.map((elem) => {
        return { id: elem.id, name: elem.name };
    })
    return categoryForSend
}

router.post("/image_category", async (req, res) => {
    if (req.body.category) {
        const categoryDataSend = await imageCategorySearchInDataBaseNesting(req.body.category);
        res.send([categoryDataSend])
    } else {
        const categoryDataSend = await imageCategorySearchInDataBase()
        res.send([categoryDataSend]);
    }
});



export { router }

