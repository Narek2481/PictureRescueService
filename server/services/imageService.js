import { Public, Image, User, Announcement, Category } from "../data_base/tables.js";

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
            public_or_private:publicOrPrivateInDataBase.id
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

export { imageLoudeForDataBaseForCategory, imageLoudeForDataBase, addImageDataInDataBase, publicOrPrivateCreater ,addAvatarInDB}