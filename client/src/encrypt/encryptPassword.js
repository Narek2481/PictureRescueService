import  CryptoJS from 'crypto-js';

function encryptPassword(message, secretKey) {
  const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
  return encrypted;
}

function decryptPassword (message, secretKey) {
  const decrypted = CryptoJS.AES.decrypt(message, secretKey).toString(CryptoJS.enc.Utf8);
  return decrypted
}

export  {encryptPassword,decryptPassword};