import jwt from "jsonwebtoken";




const generateVerificationToken = async (userId) => {
    try {
        const payload = {
            clientId: userId,
        };
        const options = {
            expiresIn: '1h', // Set the expiration time for the token
        };
        const token = await jwt.sign(payload, process.env.SECRET, options);
        console.log(token)
        return token
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
const tokenVerifyMiddleware = async (req, res, next) => {
    try {
        console.log("tokenVerifyMiddleware");
        // console.log(req.cookies ? 1 :2,"ststss");
        console.log(req.cookies, "ststss");
        if (typeof req.cookies !== 'undefined') {
            const status = await jwt.verify( req.cookies.token,process.env.SECRET);
            console.log(status,"status")
            res.cookie('login', cookieValue, { maxAge: 60*60*1000, httpOnly: true ,path:"/"});
            res.cookie('loginStatus', true, { maxAge: 60*60*1000, httpOnly: true ,path:"/"});
            return next();
        } else {
            res.cookie('loginStatus', false, { maxAge: 60*60*1000, httpOnly: true ,path:"/"});
            return next();
        }
    } catch (e) {
        console.log("tokenVerifyMiddleware55")
        console.log(e)

        res.cookie('loginStatus', false, { maxAge: 60 * 60 * 1000, httpOnly: true, path: "/" });
        return next();
    }
}

export { generateVerificationToken, tokenVerify, tokenVerifyMiddleware }