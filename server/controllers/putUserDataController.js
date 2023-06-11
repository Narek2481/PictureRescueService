import { ApiError } from "../middlewares/error-middleware.js";
import { containsValidNameOrLastName, validateEmail, validatePassword } from "../validatry/validatry.js";
import { User } from "../data_base/tables.js"
import bcrypt from "bcrypt";

const putUserDataController = async (req, res, next) => {
    try {

        console.log("putUserDataController", "--------------------------");

        const { name, lastName, password, email } = req.body
        console.log(name ? true : containsValidNameOrLastName(name));
        console.log(lastName ? true : containsValidNameOrLastName(lastName));
        console.log(email ? true : validateEmail(email));
        console.log(password ? true : validatePassword(password) === "ok");
        const validation = (
            name ? true : containsValidNameOrLastName(name) ||
                lastName ? true : containsValidNameOrLastName(lastName) ||
                    email ? true : validateEmail(email) || password ? true : validatePassword(password) === "ok"
        );
        console.log(validation);
        if (validation) {
            // const user = await User.findByPk(req.user.clientId);
            // console.log(user);
            console.log(name);
            console.log(email);
            console.log(password);
            console.log(lastName);
            const newUserData = {}
            name !== "" ? newUserData.name = name : "";
            email !== "" ? newUserData.email = email : "";
            password !== "" ? newUserData.password = password : "";
            lastName !== "" ? newUserData.last_name = lastName : "";
            if(newUserData.password){
                const hashedPassword = await bcrypt.hash(newUserData.password, 10);
                newUserData.password = hashedPassword
            }
            await User.update(
                newUserData,
                { where: { id: req.user.clientId } }
            );
            // await user.save();
            res.status(201).send("ok")
        } else {
            next(ApiError.BadRequest(` The first letter of the name must be capitalized.
            The first letter of the last name must be capitalized.
            The email address must not contain spaces, contain the "@" symbol,
            contain "." symbol,"." must be followed by at least one character.
            Password must be 8 characters or numbers
            `))
        }
        console.log("putUserDataController", "--------------------------");

    } catch (e) {
        next(e)
    }
}




export default putUserDataController