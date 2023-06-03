import bcrypt from "bcrypt";
import { User } from "../data_base/tables.js";
import { generateRefreshToken, generateVerificationToken } from "../tokenWork/tokenCreater.js";
import { v4 as uuidv4 } from 'uuid';
import MailService from "../email_veryfication/trueEmail.js";
import { containsValidNameOrLastName, validateEmail, validatePassword } from "../validatry/validatry.js";
import { ApiError } from "../middlewares/error-middleware.js";
const addDatabaseUser = async body => {
    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        
        const attemptToRegister = await User.findOne({
            where: {
                email: body.email
            }
        });
        if (attemptToRegister !== null) {
            return { status: "This email or UserName exists ", data: null }
        }
        return { status: "ok", data: hashedPassword };
    } catch (e) {
    
        return e;
    }
}



const preparationRegistrationSubmit = async (body) => {
    
    const status = await addDatabaseUser(body);
    if (status.status === "ok") {
        try {
           
            const refreshToken = await generateRefreshToken(body.email)
            
            const userData = await User.create({
                name: body.name,
                email: body.email,
                password: status.data,
                last_name: body.lastname,
                refreshToken:refreshToken.refreshToken
            });
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




const registrationSubmitController = async (req, res,next) => {
    try {
        const validation = (
            containsValidNameOrLastName(req.body.name, req.body.lastname) &&
            containsValidNameOrLastName(req.body.lastname) &&
            validateEmail(req.body.email) && validatePassword(req.body.password) === "ok"
        );
        if (validation) {
            const data = await preparationRegistrationSubmit(req.body);
            if (typeof data === "object") {
                res.cookie('refreshToken', data.tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/" });
                res.cookie('name', data.name, { maxAge: 60 * 60 * 1000, httpOnly: false, path: "/api" });
                res.status(201);
                res.send(data);
            } else {
                next(ApiError.BadRequest(data));
            }
        } else {
             next(ApiError.BadRequest(data))
        }
    }
    catch (e) {
        res.send(e);
    }
}


export { preparationRegistrationSubmit,registrationSubmitController };