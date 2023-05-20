import sharp from "sharp";
import fs from "fs";
import { addImageDataInDataBase } from "../../data_base/queryInDataBase.js";


const returnImageWidthHeight = async path => {
    const img = await sharp(path);
    const metadata = await img.metadata();
    return metadata.width + "x" + metadata.height
}





const imagePush = async (req, res) => {
    const token = req.cookies.token;
    const examination = await tokenVerify(token);
    const imageSizeForDataBase = await returnImageWidthHeight(req.file.path);
    if (examination.exp > 0) {
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
                            , {selectValue:"Avatar"}
                            , true
                            , token
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

}