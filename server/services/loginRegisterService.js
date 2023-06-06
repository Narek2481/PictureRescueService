import bcrypt from "bcrypt";
import { User } from "../data_base/tables.js";
const addDatabaseUser = async body => {
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const attemptToRegister = await User.findOne({
            where: {
                email: body.email
            }
        });

        console.log(attemptToRegister);
        if (attemptToRegister !== null) {
            return { status: "This email or UserName exists", data: null }
        }
        return { status: "ok", data: hashedPassword };
    } catch (e) {
        console.log(e)
        return `Eror ${e}`;
    }
}

const checkDatabaseUser = async body => {
    try {
        const user = await User.findOne({
            where: {
                email: body.login
            }
        });
        if (user) {
            const compare = await bcrypt.compare(body.password, user.password)
            const compareResult = compare ? { id: user.id, name: user.name } : "Password is not correct"
            console.log(compareResult, 11212222222222)
            return compareResult
        } else {
            return "Email is not correct"
        }
    } catch (e) {
        return "Something went wrong"
    }

};

const logout = async refreshToken => {
    await User.update(
        { refreshToken: null },
        { where: { refreshToken } }
    );
}

export{addDatabaseUser ,checkDatabaseUser,logout};