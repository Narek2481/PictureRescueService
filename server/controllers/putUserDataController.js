import { ApiError } from "../middlewares/error-middleware.js";
import { containsValidNameOrLastName, validateEmail, validatePassword } from "../validatry/validatry.js";
import { User } from "../data_base/tables.js"
const putUserDataController = async (req, res, next) => {
    try {
        const { name, lastName, password, email } = req.body
        const validation = (
            !name ? true : containsValidNameOrLastName(name) &&
                !lastName ? true : containsValidNameOrLastName(lastName) &&
                    !email ? true : validateEmail(email) && !password ? true : validatePassword(password) === "ok"
        );
        if (validation) {
            const user = await User.findByPk(req.user.clientId);
            name !== "" ? user.name = name : "";
            email !== "" ? user.email = email : "";
            password !== "" ? user.password = password : "";
            lastName !== "" ? user.last_name = lastName : "";
            await user.save();
            res.status(201).send("ok")
        } else {
            next(ApiError.BadRequest(` The first letter of the name must be capitalized.
            The first letter of the last name must be capitalized.
            The email address must not contain spaces, contain the "@" symbol,
            contain "." symbol,"." must be followed by at least one character.
            Password must be 8 characters or numbers
            `))
        }
    } catch (e) {
        next(e)
    }
}




export default putUserDataController