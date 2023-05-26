import { validateAccessToken } from "../tokenWork/RefreshToken.js";

const auth = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.autorizational;
        console.log(authorizationHeader,"authorizationHeader")
        if (!authorizationHeader) {
            res.status(401);
            return next();
        }
        const accessToken = authorizationHeader.split(" ")[1];
        if(!accessToken){
            res.status(401);
            return next();
        }
        const userData = validateAccessToken(accessToken);
        if(!userData){
            console.error("User is not authorized ")
            res.status(401);
            return next();
        }
        req.user = userData
        console.log(req.user)
        return next();
    } catch (e) {
        
        return next(e);
    }
}

export {auth}