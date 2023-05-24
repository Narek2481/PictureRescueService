import jwt from "jsonwebtoken";
import { User } from "../data_base/tables.js";
import { generateRefreshToken, generateVerificationToken } from "./tokenCreater.js";
import { ApiError } from "../middlewares/error-middleware.js";

const validateAccessToken = async token => {
    try {
        const userData = await jwt.verify(token, process.env.SECRET);
        return userData
    } catch (e) {
        return null;
    }
}

const validateRefreshToken = async token => {
    try {
        const userData = await jwt.verify(token, process.env.SECRET_REFRESH);
        return userData
    } catch (e) {
        console.log(e)
        return null;
    }
}

const RefreshToken = async (refreshToken) => {
    try {
        console.log(refreshToken,"userDatauserData")
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await validateRefreshToken(refreshToken);
        console.log(refreshToken,"userDatauserData")
        const tokenInDB = User.findOne({
            email: {
                userData
            }
        });
        if(userData || tokenInDB){
            throw ApiError.UnauthorizedError()
        }
        const accessToken = await generateVerificationToken(tokenInDB.id);
        const newRefreshToken = await generateRefreshToken(tokenInDB.email);
        return {
            tokens:{accessToken,refreshToken:newRefreshToken},
            name:tokenInDB.name
        };

    } catch (e) {
        return e;
    }
}

const refresh = async (req, res, next) => {
    try {
        const {refreshToken} = req.cookies;
        console.log(process.env.SECRET_REFRESH,5567)
        const userData = await RefreshToken(refreshToken);
        console.log(userData)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData.accessToken);
    } catch (e) {
        res.json(e)
        return next();
    }
}

export {RefreshToken,validateAccessToken,validateRefreshToken,refresh}