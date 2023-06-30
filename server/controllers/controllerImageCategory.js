import { Category, Image} from "../data_base/tables.js";

//  add public or privet search 
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
            })
            .catch(error => {
                console.error(error);
            });

    } catch (e) {
        return e;
    }
}

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
        return e;
    }
}




const imageCategorySearchInDataBaseNesting = async category => {
    try {
        const limit = 9;
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
        });

        

        const categoryForSend = categoryInDataBase.map((elem) => {
            return { id: elem.id, name: elem.name };
        })
        const imageDataForSend = imageDataInDb ? imageDataInDb.map((elem) => {
            return {
                imageWidthHeght: elem.width_heght,
                image_url: elem.ref_or_path
            }
        }) : [];

        return [categoryForSend, imageDataForSend, limit];
    } catch (e) {
        return e;
    }
}

const categoryController = async (req, res,next) => {
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
        next(e)
    }

}

export {categoryController};