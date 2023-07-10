
import { Public, Image, User, Category } from "../data_base/tables.js";
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
                if (newCategory !== "") {
                    const newCategoryCreate = await Category.create({
                        name: newCategory,
                        parent: null
                    });
                    return newCategoryCreate.id
                } else {
                    return null
                }


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
        console.log(imageData, "imageDataimageData");
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
        Public.update(
            { ImageId: Image.id },
            { where: { id: publicOrPrivateInDataBase.id } }
        )
        console.log("okokokoko");
        return "ok"
    } catch (e) {
        return "eror"
    }
}

const imageLoudeForDataBase = async (req) => {
    try {
        const offset = req.query.offset;
        const category = req.query.categoryValue;
        let categoryDataForSearch = null
        if (category) {
            categoryDataForSearch = await Category.findOne({
                where: { name: category }
            })
        }
        const result = categoryDataForSearch !== null ? await Image.findAll({
            include: [Public],
            limit: offset ? offset : 9,
            where: { category: categoryDataForSearch },
            order: [['createdAt', 'DESC']]
        }) : await Image.findAll({
            include: [Public],
            limit: offset ? offset : 9,
            order: [['createdAt', 'DESC']]
        });

        console.log(result, "joindataatatat");
        const imageForSendData = await Promise.all(result.map(async (image) => {
            if (image.Public.public === true) {
                return {
                    image_url: image.ref_or_path,
                    imageWidthHeght: image.width_heght,
                    id: image.id
                };
            } else {
                const authorizationHeader = req.headers.authorization;
                const accessToken = authorizationHeader.split(' ')[1];
                const data = await PublicImageDataCreater(accessToken, image);
                return data;
            }
        }));

        console.log(imageForSendData, "imageForSendData");
        return imageForSendData;

    } catch (e) {
        console.log(e);
        return e;
    }
}

function PublicImageDataCreater(accessToken, image) {
    const userData = validateAccessToken(accessToken);
    return userData
        .then(userData => {
            if (image.Public.author === userData.clientId) {
                return {
                    image_url: image.ref_or_path,
                    imageWidthHeght: image.width_heght,
                    id: image.id,
                    text: "This photo is private and available only to you"
                }
            } else {

                return null
            }
        })
        .catch(() => null)



    // if (publicDataAuther[indexForDataArray] && userData.clientId === publicDataAuther[indexForDataArray]) {
    //     console.log({
    //         image_url: e.ref_or_path,
    //         imageWidthHeght: e.width_heght,
    //         id: e.id,
    //         text: "This photo is private and available only to you"
    //     });
    //     return {
    //         image_url: e.ref_or_path,
    //         imageWidthHeght: e.width_heght,
    //         id: e.id,
    //         text: "This photo is private and available only to you"
    //     }
    // } else {
    //     return null
    // }
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
            order: [['createdAt', 'DESC']],
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

const findeImageForDelete = async (imageId) => {
    try{
        const imageData  = await Image.findOne({
            where: {
                id: imageId
            }
        });
        const publicId = imageData.public_or_private
        await Image.destroy({ where: { id: imageId } })
        await Public.destroy({ where: { id: publicId } })
        return "ok"
    }catch(e){
        return e
    }
}


export { findeImageForDelete,PublicImageDataCreater, imageLoudeForDataBaseForCategory, imageLoudeForDataBase, addImageDataInDataBase, publicOrPrivateCreater, addAvatarInDB }