import { Category, Image} from "../data_base/tables.js";




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