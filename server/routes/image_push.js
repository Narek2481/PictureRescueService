import multer from "multer";
import fs from "fs";


const upload = multer({ dest: 'server/img' });
const image_push = (app) => {
    app.post('/image_push', upload.single('image'), (req, res) => {
        fs.readFile(req.file.path, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving image file');
            } else {
                // Write the image file to disk
                const original_name = req.file.originalname;
                let path_in_req = req.file.path.split("/").map((elem, i, arr) => {
                    if (i + 1 !== arr.length) {
                        return elem + "/"
                    } else {
                        return original_name
                    }
                });
                path_in_req = path_in_req.join("");
                fs.writeFile(path_in_req, data, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error saving image file');
                    } else {
                        res.status(200).send('Image file saved successfully');
                    }
                });
            }
        });
    });
}


export default image_push;