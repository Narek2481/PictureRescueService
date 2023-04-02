import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import bcrypt from "bcrypt"
import { Public, Image, User, Announcement, Category } from "../data_base/tables.js"
import { STRING } from "sequelize";
// import { sequelize } from "../data_base/db.js";

// root route -----------------------------------------------------------------------------------
function root_route(req, res, next) {
    if (req.originalUrl === "/" && req.method === "GET") {
        res.send("ok");
        return next();
    }
    return next();
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


async function token_creater(id) {
    const token = await jwt.sign({ id }, "YOUR_SECRET_KEY");
    return token;
}
// registration_submit route -----------------------------------------------------------------------------------
const registration_submit = async (req, res, next) => {
    if (req.originalUrl === "/registration_submit" && req.method === "POST") {
        // console.log(add_database_user(req.body), "------------------------")
        const status = await add_database_user(req.body)
        if (status.status == "ok") {
            try {
                const new_user = {
                    name: req.body.name,
                    email: req.body.email,
                    password: status.data,
                    last_name: req.body.lastname
                }
                console.log(1, "------------------------------------------------")
                const user_data = await User.create(new_user)
                console.log(user_data, "--------------------------------------")
                let token = await token_creater(user_data.id)
                res.send({
                        user: user_data,
                        token:token
                    });
            } catch(e){
                console.log(STRING(e))
            }
            return next();
        }
    }
    return next();
}


// login submit route -----------------------------------------------------------------------------------
const secretKey = 'mysecretkey';
// Generate a verification token for a user
function generateVerificationToken(userId) {
    const payload = { sub: userId };
    const options = { expiresIn: '24h' };
    return jwt.sign(payload, secretKey, options);
}
// Verify a verification token and return the associated user ID
function verifyVerificationToken(token) {
    try {
        const payload = jwt.verify(token, secretKey);
        return payload.sub;
    } catch (err) {
        return null;
    }
}
const login_submit = (req, res, next) => {
    // const token = req.query.token;
    // const userId = verifyVerificationToken(token);
    // const token_x = generateVerificationToken(req.body.email);
    // const verifyLink = `http://localhost:4000/verify-email?token=${token}`;

    // if (!userId) {
    //     res.status(400).send('Invalid or expired verification token');
    //     return;
    // }
    if (req.originalUrl === "/login_submit" && req.method === "POST") {
        console.log(req.body);
        res.send("ok");
        return next();
    }
    return next();
}



// image push route -----------------------------------------------------------------------------------
const upload = multer({ dest: 'server/img' });
const image_push = (req, res, next) => {
    if (req.originalUrl === "/image_push" && req.method === "POST") {
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
        return next();
    }
    return next();
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
    if (req.originalUrl === "/image_loud" && req.method === "GET") {
        console.log(req.body);
        res.send(images);
        return next();
    }
    return next();
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
    if (req.originalUrl === "/image_category" && req.method === "POST") {
        console.log(req.body)
        res.send([select]);
        return next();
    }
    return next();
}




// all reutes ------------------------------------------------------------------------------------------------
function route(req, res, next) {
    root_route(req, res, next);
    image_category(req, res, next);
    image_loud(req, res, next);
    image_push(req, res, next);
    login_submit(req, res, next);
    registration_submit(req, res, next);
}

export { route }

