import jwt from "jsonwebtoken";



const generateRefreshToken = async email => {
    try {
        const payload = {
            email : email
        };
        const option = {
            expiresIn: '30d',
        };
        const refreshToken = await jwt.sign(payload, process.env.SECRET_REFRESH, option);
        return {
            refreshToken
        }

    } catch (e) {

    }
}

const generateVerificationToken = async (userId) => {
    try {
        const payload = {
            clientId: userId
        };
        const options = {
            expiresIn: '30m'
        };

        const accessToken = await jwt.sign(payload, process.env.SECRET, options);
        console.log(accessToken)

        return {
            accessToken
        }
    } catch (e) {
        return e;
    }
}



const tokenVerify = async (userToken) => {
    try {
        const status = await jwt.verify(userToken, process.env.SECRET);
        return status;
    } catch (e) {
        return e;
    }
}


export { generateVerificationToken, tokenVerify, generateRefreshToken }