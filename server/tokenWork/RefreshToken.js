import jwt from "jsonwebtoken";
import { User } from "../data_base/tables.js";
import { generateRefreshToken, generateVerificationToken } from "./tokenCreater.js";
import { ApiError } from "../middlewares/error-middleware.js";

const validateAccessToken = async token => {
    try {
        const userData = await jwt.verify(token, process.env.SECRET);
        return userData;
    } catch (e) {
        return null;
    }
}

const validateRefreshToken = async token => {
    try {
        const userData = await jwt.verify(token, process.env.SECRET_REFRESH);
        return userData
    } catch (e) {
        return null;
    }
}

const RefreshToken = async (refreshToken) => {
    console.log("-----------------2-------------------------------------------------");
    console.log(refreshToken)
    try {
        console.log(refreshToken, "rtk")
        if (!refreshToken) {
            return null
        }
        const userData = await validateRefreshToken(refreshToken);
        console.log(refreshToken, "userDatauserData")
        const tokenInDB = await User.findOne({
           where:{ email: userData.email}
    
        });
        console.log(tokenInDB, userData)
        if (!userData || !tokenInDB) {
            return null
        }
        const accessToken = await generateVerificationToken(tokenInDB.id);
        const newRefreshToken = await generateRefreshToken(tokenInDB.email);
        return {
            tokens: { accessToken, refreshToken: newRefreshToken },
            name: tokenInDB.name
        };

    } catch (e) {
        return e;
    }
}

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        console.log(refreshToken, "rtk2");
        console.log(process.env.SECRET_REFRESH, 5567)
        const userData = await RefreshToken(refreshToken.refreshToken);
        if (!userData.tokens.refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        res.cookie('refreshToken', userData.tokens.refreshToken,
            { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: "/" })
        res.status(200).json({ token: userData.tokens.accessToken, name: userData.name });
    } catch (e) {
        res.send(e)
        return next();
    }
}

export { RefreshToken, validateAccessToken, validateRefreshToken, refresh }