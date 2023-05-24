import bcrypt from "bcrypt";
import { Public, Image, User, Announcement, Category } from "./tables.js";
import { validateRefreshToken } from "../tokenWork/RefreshToken.js";



const addDatabaseUser = async body => {
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const attemptToRegister = await User.findOne({
            where: {
                email: body.email
            }
        });

        console.log(attemptToRegister);
        if (attemptToRegister !== null) {
            return { status: "This email or UserName exists", data: null }
        }
        return { status: "ok", data: hashedPassword };
    } catch (e) {
        console.log(e)
        return `Eror ${e}`;
    }
}

const checkDatabaseUser = async body => {
    try {
        const user = await User.findOne({
            where: {
                email: body.login
            }
        });
        if (user) {
            const compare = await bcrypt.compare(body.password, user.password)
            const compareResult = compare ? { id: user.id, name: user.name } : "Password is not correct"
            console.log(compareResult, 11212222222222)
            return compareResult
        } else {
            return "Email is not correct"
        }
    } catch (e) {
        return "Something went wrong"
    }

};

const publicOrPrivateCreater = async (publicImage, userToken) => {
    try {
        console.log(publicImage, 4444444)
        console.log(userToken, "-------------------")
        const decodedToken = await tokenVerify(userToken);
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
        const parentCategory = categoryData.selectValue === "All" ? false : await Category.findOne({
            where: {
                name: categoryData.selectValue
            }
        });

        const CategoryIsEmpty = categoryData.newCategory !== "" ? await Category.findOne({
            where: {
                name: categoryData.newCategory
            }
        }) : false;

        const newCategory = {
            name: categoryData.newCategory ? categoryData.newCategory : categoryData.selectValue,
            parent: parentCategory ? parentCategory.id : null
        };
        // await Category.create(newCategory)
        const newCategoryStatus = CategoryIsEmpty ? CategoryIsEmpty : false;
        const newCategoryInDataBase = newCategoryStatus ? newCategoryStatus : await Category.create(newCategory);
        console.log(newCategoryInDataBase, "CategoryIsEmpty")

        console.log(publicOrPrivateInDataBase, 22222211111)
        const newImage = {
            ref_or_path: imageData.name,
            width_heght: imageData.imageSizeForDataBase,
            category: newCategoryInDataBase.id,
            public_or_private: publicOrPrivateInDataBase.id
        };

        await Image.create(newImage);

        return "ok"
    } catch (e) {
        return "eror"
    }
}

const imageLoudeForDataBase = async (req) => {
    try {

        const offset = req.body.offset * 12
        let imagesInDb = await Image.findAll({
            order: [['id']],
            limit: offset ? offset : 9
        })
        if (imagesInDb.length === 0) {
            imagesInDb = await Image.findAll({
                order: [['id']],
                limit: 9,
            })
        }
        const imageObjArr = imagesInDb.map((e) => {

            return {
                image_url: e.ref_or_path,
                imageWidthHeght: e.width_heght,
                id: e.id
            }
        })
        console.log(imageObjArr, "--------------------------")
        return imageObjArr;

    } catch (e) {
        return e;
    }
}

const imageLoudeForDataBaseForCategory = async req => {
    try {
        const offset = req.body.offset * 12
        let categoryData = await Category.findOne({
            where: {
                name: req.categoryValue
            }
        })
        let imagesInDb = await Image.findAll({
            where: {
                category: categoryData.id

            },
            order: [['id']],
            limit: offset ? offset : 9
        })
        const imageObjArr = imagesInDb.map((e) => {
            return {
                image_url: e.ref_or_path,
                imageWidthHeght: e.width_heght,
                id: e.id
            }
        });
        return imageObjArr;
    } catch (e) {
        return e
    }
}

const logout = async refreshToken => {
    await User.update(
        { refreshToken: null },
        { where: { refreshToken } }
    )
}
export { addDatabaseUser, checkDatabaseUser, addImageDataInDataBase, imageLoudeForDataBase, imageLoudeForDataBaseForCategory,logout }