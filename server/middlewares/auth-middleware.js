import { validateAccessToken } from "../tokenWork/RefreshToken.js";
import { ApiError } from "./error-middleware.js";


const auth = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        console.log(authorizationHeader,"authorizationHeader")
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = await validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        
        req.user = userData;
        next();
    } catch (e) {
        return next(e);
    }
}

export {auth}