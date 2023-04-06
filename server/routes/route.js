import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import bcrypt from "bcrypt"
import { Public, Image, User, Announcement, Category } from "../data_base/tables.js"
import express from "express";

const router = express.Router()
const secret = "Narek2481"


// root route -----------------------------------------------------------------------------------
router.get("/", (req, res) => {

    res.send("ok");
});


// registrationSubmit route -----------------------------------------------------------------------------------
const addDatabaseUser = async body => {
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const attempt_to_register = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (attempt_to_register) {
            return { status: "this email or userName exists", data: null }
        }
        return { status: "ok", data: hashedPassword };
    } catch (e) {
        console.log(e)
        return `err ${e}`;
    }
}


const generateVerificationToken = async (userId) => {
    const payload = {
        client_id: userId,
    };
    const options = {
        expiresIn: '1h', // Set the expiration time for the token
    };
    const token = await jwt.sign(payload, secret, options);
    return token
}
const preparationRegistrationSubmit = async (body) => {
    const status = await addDatabaseUser(body);
    if (status.status == "ok") {
        try {
            const new_user = {
                name: body.name,
                email: body.email,
                password: status.data,
                last_name: body.lastname
            }
            const user_data = await User.create(new_user);
            const token = await generateVerificationToken(user_data.id);
            return (
                {
                    token: token
                }
            )
        } catch (e) {
            return String(e)
        }
    }
}
router.post("/registrationSubmit", async (req, res) => {
    const data = await preparationRegistrationSubmit(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.send(data)
});



// login submit route -----------------------------------------------------------------------------------
const checkDatabaseUser = async body => {
    try {
        const user = await User.findOne({
            where: {
                email: body.login
            }
        });
        if (user) {
            const compare =  await bcrypt.compare(body.password, user.password)
            
            return compare ? user.id : "password is not correct"
        }
    } catch (e) {
        return  "Something went wrong"
    }

};


router.post("/loginSubmit", async (req, res) => {
    console.log(req.body)
    const result = await checkDatabaseUser(req.body);
    if(result === "password is not correct"){
        res.status(400).json("password is not correct")
    }else if(result === "Something went wrong"){
        res.status(400).json("Something went wrong")
    }else{
        const token = await generateVerificationToken(result)
        res.status(200).json({token})
    }
    res.end
})


// image push route -----------------------------------------------------------------------------------
const upload = multer({ dest: 'server/img' });
const imagePush = (req, res) => {
    console.log(req.body)
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
}

router.post("/imagePush", upload.single('image'), imagePush)



// image loud route -----------------------------------------------------------------------------------
router.get("/image_loud", (req, res) => {
    const images = [
        {
            image_url: "1559455754_1.jpg"
        },
        {
            image_url: "1586162565_2.jpg"
        },
        {
            image_url: "download.jpeg"
        },
        {
            image_url: "i.webp"
        },
        {
            image_url: "images.jpeg"
        },
        {
            image_url: "kartinka_motivatsiya_tsitata_9.jpg"
        }
    ];

    console.log(req.body);
    res.send(images)
})

// image category route -----------------------------------------------------------------------------------
router.post("/image_category", (req, res) => {
    const select = [
        {
            value: "poxos"
        },
        {
            value: "hopar"
        },
        {
            value: "chgitem"
        },
        {
            value: "anhayt"
        },
        {
            value: "errrr"
        },
    ];
    console.log(req.body)
    res.send([select]);
})





export { router }

