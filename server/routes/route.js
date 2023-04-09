import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import bcrypt from "bcrypt"
import { Public, Image, User, Announcement, Category } from "../data_base/tables.js"
import express from "express";
import sharp from "sharp"

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

        console.log(attempt_to_register);
        if (attempt_to_register !== null) {
            return { status: "This email or UserName exists", data: null }
        }
        return { status: "ok", data: hashedPassword };
    } catch (e) {
        console.log(e)
        return `Eror ${e}`;
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
    console.log(token)
    return token
}

const preparationRegistrationSubmit = async (body) => {
    console.log(body)
    const status = await addDatabaseUser(body);
    if (status.status === "ok") {
        try {
            const userData = await User.create({
                name: body.name,
                email: body.email,
                password: status.data,
                last_name: body.lastname
            });
            console.log(userData)
            const token = await generateVerificationToken(userData.id);
            return (
                {
                    token: token
                }
            )
        } catch (e) {
            return String(e)
        }
    } else {
        return status.status
    }
}


router.post("/registrationSubmit", async (req, res) => {
    const data = await preparationRegistrationSubmit(req.body);
    console.log(data,"--------------------------")
    if (typeof data === "object") {
        res.status(200)
        res.send(data)
    } else {
        res.status(400);
        res.send(data)
    }

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
            const compare = await bcrypt.compare(body.password, user.password)

            return compare ? user.id : "password is not correct"
        }
    } catch (e) {
        return "Something went wrong"
    }

};


router.post("/loginSubmit", async (req, res) => {
    console.log(req.body)
    const result = await checkDatabaseUser(req.body);
    if (result === "password is not correct") {
        res.status(400).json("password is not correct");
    } else if (result === "Something went wrong") {
        res.status(400).json("Something went wrong");
    } else {
        const token = await generateVerificationToken(result)
        res.status(200).json({ token });
    }
    res.end
})


// image push route -----------------------------------------------------------------------------------
const publicOrPrivateCreater = async (publicImage, userToken) => {
    try{
        const decodedToken = await jwt.verify(userToken, secret);
        const userId = decodedToken.id;
        return  await Public.create({
            public:publicImage,
            author:userId
        });
    }catch(e){
        return "Something went wrong"
    }
}
const erorCreater = (e) =>{
    return console.error(e);
}

const addImageDataInDataBase = async (
    imageData, categoryData, publicImage, userToken
) => {
    try {
        const publicOrPrivateInDataBase = await publicOrPrivateCreater(publicImage, userToken);

        const parentCategory = await Category.findOne({
            where: {
                name: categoryData.selectValue
            }
        });
        
        const newCategory = {
            name: categoryData.newCategory ? categoryData.newCategory : categoryData.selectValue,
            parent: parentCategory ? parentCategory.id : null
        };

        const newCategoryInDataBase = await Category.create(newCategory);
        const dataStatus =  (
            typeof publicOrPrivateInDataBase === "object" ? publicOrPrivateInDataBase.id : erorCreater("publicOrPrivateInDataBase eror")
        ); 

        const newImage = {
            ref_or_path: imageData.name,
            width_heght: imageData.imageSizeForDataBase,
            category: newCategoryInDataBase.id,
            public_or_private: dataStatus
        };

        await Image.create(newImage);

        return "ok"
    } catch (e) {
        return "eror"
    }
}

const returnImageWidthHeight = async path => {
    const img = await sharp(path);
    const metadata = await img.metadata();
    return metadata.width + "x" + metadata.height
}

const upload = multer({ dest: 'server/img' });


const imagePush = async (req, res) => {
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
            const originalName = req.file.originalname;
            console.log(req.file.size.width, "widt")
            console.log(req.file.originalname, "originalName")
            console.log(req)
            fs.writeFile(originalName, data, async (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error saving image file');
                } else {
                    const dataBaseStatus = await addImageDataInDataBase(
                        { 
                            name: req.file.originalname, 
                            imageSizeForDataBase,
                            publicImage:req.body.publicImage
                         }
                        , categoryData
                        , req.body.publicImage
                        ,req.body.userToken
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

router.post("/imagePush", upload.single('image', "selectvalue", 'newCategory'), imagePush)



// image loud route -----------------------------------------------------------------------------------
const seachDatabaseImage = async currentCategory => {
    try {
        const requiredCategories = await Category.findAll({
            where: {
                parent: currentCategory
            }
        });

    } catch (e) {

    }
}

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

