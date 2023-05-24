import bcrypt from "bcrypt";
import { User } from "../../data_base/tables.js";
import { generateRefreshToken, generateVerificationToken } from "../../tokenWork/tokenCreater.js";
import { v4 as uuidv4 } from 'uuid';
import MailService from "../../email_veryfication/trueEmail.js";
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
            return { status: "This email or UserName exists ", data: null }
        }
        return { status: "ok", data: hashedPassword };
    } catch (e) {
        console.log(e)
        return `Eror ${e}`;
    }
}



const preparationRegistrationSubmit = async (body) => {
    console.log(body)
    const status = await addDatabaseUser(body);
    if (status.status === "ok") {
        try {
            console.log(body.email,"body.email");
            const refreshToken = await generateRefreshToken(body.email)
            console.log(refreshToken,"refreshToken")
            const userData = await User.create({
                name: body.name,
                email: body.email,
                password: status.data,
                last_name: body.lastname,
                refreshToken:refreshToken.refreshToken
            });
            console.log(userData)
            const accessToken = await generateVerificationToken(userData.id, userData);
            // const activationLink = uuidv4();
            // console.log(activationLink)
            // await MailService.sendActivationMail(body.email,`${process.env.API_URL}/api/activate/${activationLink}`)
            return (
                {
                    tokens: {accessToken:accessToken.accessToken},
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


export { preparationRegistrationSubmit };