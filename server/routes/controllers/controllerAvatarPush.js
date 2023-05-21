import { tokenVerify } from "../../tokenWork/tokenCreater.js"
const controllerAvatarPush = async req => {
    const userId = await tokenVerify(req.cookies.login.token);
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
                        , req.cookies.login.token
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