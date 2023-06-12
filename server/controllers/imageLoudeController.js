import { imageLoudeForDataBase, imageLoudeForDataBaseForCategory } from "../services/imageService.js";

const imageLoudeController = async (req, res,next) => {
    try {
        const imageObjArr = await imageLoudeForDataBase(req);
        if (req.query.categoryValue !== "All") {
            const imageData = await imageLoudeForDataBaseForCategory(req);
            return res.status(200).json([imageData]);
        }
        res.status(200).json([imageObjArr]);
    } catch (e) {
        next(e);
    }
}

export default imageLoudeController;