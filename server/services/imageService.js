import { Sequelize } from 'sequelize';
import { Public, Image, User, Announcement, Category } from "../data_base/tables.js";
import { validateAccessToken } from '../tokenWork/RefreshToken.js';

const categoryCreater = async (categoryData) => {
    try {
        console.log(categoryData, "categoryDatacategoryDatacategoryData");
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
                    name: newCategory,
                    parent: null
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
                        name: newCategory,
                        parent: selectValueCategorySearch.id
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

const publicOrPrivateCreater = async (publicImage, userId) => {
    try {
        const publicTable = await Public.create({
            public: publicImage,
            author: userId
        });
        return publicTable
    } catch (e) {
        return "eror Something went wrong"
    }
}


const addImageDataInDataBase = async (
    imageData, categoryData, publicImage, userId
) => {
    try {
        const publicOrPrivateInDataBase = await publicOrPrivateCreater(publicImage, userId);
        const myCategory = await categoryCreater(categoryData);
        console.log(myCategory, "myCategory")
        const newImage = {
            ref_or_path: imageData.name,
            width_heght: imageData.imageSizeForDataBase,
            category: myCategory,
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

        const offset = req.query.offset
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
        const publicPrivateImage = imagesInDb.map(elem => {
            return elem.id
        })
        console.log(publicPrivateImage, "publicPrivateImage");
        const publicData = await Public.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: publicPrivateImage
                }
            }
        });
        console.log(publicData, "publicData");
        const publicDataImage = publicData.map(elem => {
            return Number(elem.id);

        })
        const publicDataAuther = publicData.map(elem => {
            return Number(elem.id);

        })
        console.log(publicDataAuther, "publicDataImage");
        const publicDataArray = publicData.map(elem => {
            return elem.public;
        })
        console.log(publicDataArray, "publicDataArray");
        let imageObjArr = imagesInDb.map((e) => {
            const indexForDataArray = publicDataImage.indexOf(e.public_or_private);
            if (indexForDataArray > -1) {
                if (publicDataArray[indexForDataArray] === true) {
                    return {
                        image_url: e.ref_or_path,
                        imageWidthHeght: e.width_heght,
                        id: e.id
                    }
                } else {
                    const authorizationHeader = req.headers.authorization;
                    const accessToken = authorizationHeader.split(' ')[1];
                    return PublicImageDataCreater(accessToken, publicDataAuther, indexForDataArray, e)
                        .then(elem => {
                            return elem
                        })
                }
            }
        })
        return Promise.allSettled(imageObjArr)
            .then(results => {
                const resolvedValues = results
                    .filter(result => result.status === 'fulfilled')
                    .map(result => result.value);
                console.log(resolvedValues,"resolvedValues");
                imageObjArr = resolvedValues
                return resolvedValues
                console.log(resolvedValues);
            })
            .catch(error => {
                console.error(error);
            });
        console.log(imageObjArr, "--------------------------")
        return imageObjArr;

    } catch (e) {
        return e;
    }
}

async function PublicImageDataCreater(accessToken, publicDataAuther, indexForDataArray, e) {
    const userData = await validateAccessToken(accessToken);
    console.log("asjkassas");
    if (publicDataAuther[indexForDataArray] && userData.clientId === publicDataAuther[indexForDataArray]) {
        console.log({
            image_url: e.ref_or_path,
            imageWidthHeght: e.width_heght,
            id: e.id,
            text: "This photo is private and available only to you"
        });
        return {
            image_url: e.ref_or_path,
            imageWidthHeght: e.width_heght,
            id: e.id,
            text: "This photo is private and available only to you"
        }
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

const addAvatarInDB = async (imageData, userId) => {
    try {
        const publicOrPrivate = await publicOrPrivateCreater(false, userId)
        const imageInDB = await Image.create({
            ref_or_path: imageData.name,
            width_heght: imageData.imageSizeForDataBase,
            category: null,
            public_or_private: publicOrPrivate.id
        });
        User.update(
            { profile_image: imageInDB.id },
            { where: { id: userId } }
        )
        return "ok"
    } catch (e) {
        return e
    }

}

export { imageLoudeForDataBaseForCategory, imageLoudeForDataBase, addImageDataInDataBase, publicOrPrivateCreater, addAvatarInDB }