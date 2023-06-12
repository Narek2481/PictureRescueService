import sharp from "sharp";
import fs from "fs";
import { addImageDataInDataBase } from "../services/imageService.js";

const returnImageWidthHeight = async path => {
    const img = await sharp(path);
    const metadata = await img.metadata();
    return metadata.width + "x" + metadata.height
}



const imagePush = async (req, res) => {
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
                    const dataBaseStatus = await addImageDataInDataBase(
                        {
                            name: req.file.originalname,
                            imageSizeForDataBase,
                            publicImage: req.body.publicImage
                        }
                        , categoryData
                        , req.body.publicImage
                        , userId
                    );
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

const imagePushcontroller = async (req, res, next) => {
    try {
        console.log(req.user, "req.userreq.user")
        await imagePush(req, res);
    } catch (e) {
        next(e)
    }
}

export { imagePush ,imagePushcontroller}