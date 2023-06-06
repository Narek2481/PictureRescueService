import path from "path";
import fs from "fs"
import { User, Image } from "../data_base/tables.js";





const getAvatarController = async (req, res, next) => {
    try {
        const userId = req.user.clientId;
        const currentUser = await User.findOne({
            where: {
                id: userId
            }
        });
        const imageData = await Image.findOne({
            where: {
                id: currentUser.profile_image
            }
        });

        const imagePath = path.resolve("./avatar/" + imageData.ref_or_path);
        res.setHeader("Content-Type", "image/png");
        res.setHeader("Content-Length", fs.statSync(imagePath).size);

        res.sendFile(imagePath);
    } catch (e) {
        res.send(null)
        return next(e)
    }
}

export default getAvatarController;