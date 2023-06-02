import CryptoJS from 'crypto-js';
const { AES } = CryptoJS;


async function decrypter(encryptedMessage, secretKey) {
  const decrypted = await AES.decrypt(encryptedMessage, secretKey).toString(CryptoJS.enc.Utf8);
  return decrypted;
}


const adecryptPassword = async (req, res, next) => {
    try {
        const password = await decrypter(req.body.password,process.env.ENCRYPTION_SECRET)
        req.body.password = password
        next();
    } catch (e) {
        return next(e);
    }
}

export default adecryptPassword;
