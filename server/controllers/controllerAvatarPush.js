import fs from "fs";
import sharp from "sharp";

import { addAvatarInDB } from "../services/imageService.js";

const returnImageWidthHeight = async path => {
    const img = await sharp(path);
    const metadata = await img.metadata();
    return metadata.width + "x" + metadata.height
}

const controllerAvatarPush = async req => {
    console.log(req, "ddddddddddddd")
    const userId = req.user.clientId;
    const imageSizeForDataBase = await returnImageWidthHeight(req.file.path);
    const categoryData = {
        selectValue: req.body.selectValue,
        newCategory: req.body.newCategory
    };
    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving image file');
        } else {
            // Write the image file to disk
            const pathInEeq = req.file.path.split("/").map((elem, i, arr) => {
                if (i + 1 !== arr.length) {
                    return elem + "/"
                } else {
                    return req.file.originalname
                }
            });

            const originalName = pathInEeq.join("");
            fs.writeFile(originalName, data, async (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error saving image file');
                } else {
                    const dataBaseStatus = await addAvatarInDB({
                        name: req.file.originalname,
                        imageSizeForDataBase,
                        publicImage: req.body.publicImage
                    }, userId);
                    const statusRespons = dataBaseStatus === "ok" ? 200 : 500
                    res.status(statusRespons)
                        .send(
                            statusRespons === 200 ? 'Image file saved successfully' : 'Error saving image file'
                        );
                }
            });
        }
    });
}

export default controllerAvatarPush;