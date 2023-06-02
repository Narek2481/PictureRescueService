import { AES } from 'crypto-js';

function encryptPassword(message, secretKey) {
  const encrypted = AES.encrypt(message, secretKey).toString();
  return encrypted;
}

export default encryptPassword;