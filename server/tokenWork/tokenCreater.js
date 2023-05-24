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
            expiresIn: '15m'
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
const tokenVerifyMiddleware = async (req, res, next) => {
    try {
        console.log("tokenVerifyMiddleware");
        // console.log(req.cookies ? 1 :2,"ststss");
        console.log(req.cookie, "ststss");
        if (typeof req.cookies !== 'undefined') {
            const status = await jwt.verify(req.cookies.token, process.env.SECRET);
            console.log(status, "status")

            const cookieValue = await generateVerificationToken(status.id);
            res.cookie('login', { token: cookieValue, name: req.cookies.name }, { maxAge: 60 * 60 * 1000, httpOnly: true, path: "/" });
            res.cookie('loginStatus', true, { maxAge: 60 * 60 * 1000, httpOnly: true, path: "/" });
            return next();
        } else {
            res.cookie('loginStatus', false, { maxAge: 60 * 60 * 1000, httpOnly: true, path: "/" });
            return next();
        }
    } catch (e) {
        console.log("tokenVerifyMiddleware55")
        console.log(e)

        res.cookie('loginStatus', false, { maxAge: 60 * 60 * 1000, httpOnly: true, path: "/" });
        return next();
    }
}

function authenticateToken(req, res, next) {
    // Get the token from the cookies
    const token = req.cookies.loginToken;

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Token is valid. You can optionally attach the decoded token to the request object for later use.
        req.user = decodedToken;
        next();
    });
}

export { generateVerificationToken, tokenVerify, tokenVerifyMiddleware, authenticateToken, generateRefreshToken }