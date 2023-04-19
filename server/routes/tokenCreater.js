import jwt from "jsonwebtoken";

const secret = "Narek2481";


const generateVerificationToken = async (userId) => {
    try{
        const payload = {
            clientId: userId,
        };
        const options = {
            expiresIn: '1h', // Set the expiration time for the token
        };
        const token = await jwt.sign(payload, secret, options);
        console.log(token)
        return token
    }catch(e){
        return e;
    }
}

const tokenVerify = async (userToken, secret) => {
    try {
        const status = await jwt.verify(userToken, secret);
        return status;
    }catch(e){
        return e;
    }
}


export { generateVerificationToken ,tokenVerify}