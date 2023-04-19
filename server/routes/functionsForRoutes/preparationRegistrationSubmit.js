import { User } from "../../data_base/tables.js";
import { addDatabaseUser } from "../../data_base/queryInDataBase.js";

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
                    token: token,
                    name: userData.name
                }
            )
        } catch (e) {
            return String(e)
        }
    } else {
        return status.status
    }
}


export {preparationRegistrationSubmit};