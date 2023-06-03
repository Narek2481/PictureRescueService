import { ApiError } from "../middlewares/error-middleware.js";
import { checkDatabaseUser } from "../services/loginRegisterService.js";
import { generateRefreshToken, generateVerificationToken } from "../tokenWork/tokenCreater.js";
import { validateEmail, validatePassword } from "../validatry/validatry.js";

const loginSubmitController= async (req, res,next) => {
    try {
        if(!(validateEmail(req.body.login) && validatePassword(req.body.password) === "ok")){
             next(ApiError.BadRequest("validation failed"))
        }
        const result = await checkDatabaseUser(req.body);
        if (result === "Password is not correct") {
            next(ApiError.BadRequest("Password is not correct"));
        }else if (result === "Email is not correct") {
          next(ApiError.BadRequest("Email is not correct"));
        } else {
            const accessToken = await generateVerificationToken(result.id);
            const refreshToken = await generateRefreshToken(req.body.login);
            const cookieValue = { refreshToken: refreshToken.refreshToken };
            res.cookie('refreshToken', cookieValue, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/api" });
            res.cookie('name', result.name, { maxAge: 60 * 60 * 1000, httpOnly: false, path: "/" });
            res.status(200).json(
                {
                    tokens: { accessToken: accessToken.accessToken }, 
                    name: result.name
                }
            )
        }
    } catch (e) {
        res.send(e);
    }
}

export default loginSubmitController;