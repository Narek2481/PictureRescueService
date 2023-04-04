import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import bcrypt from "bcrypt"
import { Public, Image, User, Announcement, Category } from "../data_base/tables.js"
import { STRING } from "sequelize";
// import { sequelize } from "../data_base/db.js";

// root route -----------------------------------------------------------------------------------
function root_route(req, res, next) {
    res.send("ok");
    next();
}

async function add_database_user(body) {
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


async function generateVerificationToken(userId) {
    const payload = {
        client_id: userId,
    };
    const options = {
        expiresIn: '1h', // Set the expiration time for the token
    };
    const token = await jwt.sign(payload, 'your_secret_key_here', options);
    console.log(token);
    return token
}
// registration_submit route -----------------------------------------------------------------------------------
const registration_submit = async (req, res, next) => {
    const status = await add_database_user(req.body)
    if (status.status == "ok") {
        try {
            const new_user = {
                name: req.body.name,
                email: req.body.email,
                password: status.data,
                last_name: req.body.lastname
            }
            console.log(1, "------------------------------------------------");
            const user_data = await User.create(new_user);
            console.log(user_data, "--------------------------------------");
            const token = await generateVerificationToken(user_data.id)
            console.log(token,"token ----------------------------------------------------")
            console.log(res)
        } catch (e) {
            console.log(STRING(e));
        }
    }

    next();
}


// login submit route -----------------------------------------------------------------------------------
const login_submit = (req, res, next) => {
    console.log(req.body);
    res.send("ok");
    next();
}



// image push route -----------------------------------------------------------------------------------
const upload = multer({ dest: 'server/img' });
const image_push = (req, res, next) => {
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
    next();
}





// image loud route -----------------------------------------------------------------------------------
function image_loud(req, res, next) {
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
    res.send(images);


    next();
}



// image category route -----------------------------------------------------------------------------------
const image_category = (req, res, next) => {
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
    next();
}




// all reutes ------------------------------------------------------------------------------------------------
function route(req, res, next) {
    if (req.originalUrl === "/image_category" && req.method === "POST") {
        image_category(req, res, next);
    }
    else if (req.originalUrl === "/" && req.method === "GET") {
        root_route(req, res, next);
    } else if (req.originalUrl === "/image_loud" && req.method === "GET") {
        image_loud(req, res, next);
    } else if (req.originalUrl === "/image_push" && req.method === "POST") {
        image_push(req, res, next);
    } else if (req.originalUrl === "/login_submit" && req.method === "POST") {
        login_submit(req, res, next);
    } else if (req.originalUrl === "/registration_submit" && req.method === "POST") {
        registration_submit(req, res, next);
    }

    next()



}

export { route }

