import jwt from "jsonwebtoken";




const generateVerificationToken = async (userId) => {
    try{
        const payload = {
            clientId: userId,
        };
        const options = {
            expiresIn: '1h', // Set the expiration time for the token
        };
        const token = await jwt.sign(payload, process.env.SECRET, options);
        console.log(token)
        return token
    }catch(e){
        return e;
    }
}

const tokenVerify = async (userToken) => {
    try {
        const status = await jwt.verify(userToken, process.env.SECRET);
        return status;
    }catch(e){
        return e;
    }
}


export { generateVerificationToken ,tokenVerify}