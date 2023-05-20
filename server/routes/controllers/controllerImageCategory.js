import { Category, Image} from "../../data_base/tables.js";



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
        console.log(e);
        return "eror Something went wrong";
    }
}


const imageCategorySearchInDataBaseNesting = async category => {
    try {
        const limit = 9;
        console.log(category, "categoryData");
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

        console.log(currentCategory, 1111);
        console.log(categoryInDataBase, 2222);
        console.log(585);
        console.log(imageDataInDb, "565");

        const categoryForSend = categoryInDataBase.map((elem) => {
            return { id: elem.id, name: elem.name };
        })
        const imageDataForSend = imageDataInDb ? imageDataInDb.map((elem) => {
            return {
                imageWidthHeght: elem.width_heght,
                image_url: elem.ref_or_path
            }
        }) : [];
        console.log(imageDataForSend, 6666);

        return [categoryForSend, imageDataForSend, limit];
    } catch (e) {
        return e;
    }
}

export {imageCategorySearchInDataBaseNesting,imageCategorySearchInDataBase};