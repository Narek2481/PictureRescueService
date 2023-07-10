import { imageLoudeForDataBase, imageLoudeForDataBaseForCategory } from "../services/imageService.js";

const imageLoudeController = async (req, res, next) => {
    try {
        if (req.query.categoryValue !== "All") {
            const imageData = await imageLoudeForDataBaseForCategory(req);
            return res.status(200).json([imageData]);
        } else {
            const imageObjArr = await imageLoudeForDataBase(req);
            res.status(200).json([imageObjArr]);
        }
    } catch (e) {
        next(e);
    }
}

export default imageLoudeController;