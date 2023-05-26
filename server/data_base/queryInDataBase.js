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

const categoryCreater = async (categoryData) => {
    try {
        console.log(categoryData,"categoryDatacategoryDatacategoryData");
        const { selectValue, newCategory } = categoryData;
        if (selectValue === "All") {
            const newCategorySearch = await Category.findOne({
                where: {
                    name: newCategory
                }
            });
            if (newCategorySearch) {
                return newCategorySearch.id
            } else {
                const newCategoryCreate = await Category.create({
                    name:newCategory,
                    parent:null
                });
                return newCategoryCreate.id
            }
        } else {
            const selectValueCategorySearch = await Category.findOne({
                where: {
                    name: selectValue
                }
            });
            if (newCategory) {
                const newCategorySearch = await Category.findOne({
                    where: {
                        name: newCategory
                    }
                });
                if (newCategorySearch) {
                    return newCategorySearch.id
                } else {
                    const newCategoryCreat = await Category.create({
                        name:newCategory,
                        parent:selectValueCategorySearch.id
                    })
                    return newCategoryCreat.id
                }
            } else {
               return selectValueCategorySearch.id
            }

        }
    } catch (e) {
        return e
    }
}


const addImageDataInDataBase = async (
    imageData, categoryData, publicImage, userToken
) => {
    try {
        
        // const publicOrPrivateInDataBase = await publicOrPrivateCreater(publicImage, userToken);
        const myCategory = await categoryCreater(categoryData);
        console.log(myCategory,"myCategory")
        const newImage = {
            ref_or_path: imageData.name,
            width_heght: imageData.imageSizeForDataBase,
            category: myCategory,
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
export { addDatabaseUser, checkDatabaseUser, addImageDataInDataBase, imageLoudeForDataBase, imageLoudeForDataBaseForCategory, logout }