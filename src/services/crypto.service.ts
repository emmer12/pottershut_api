import config from "../config/config";

var CryptoJS = require("crypto-js");

const encrypt = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    config.crypto.secret
  ).toString();
};

const decrypt = (data) => {
  var bytes = CryptoJS.AES.decrypt(data, config.crypto.secret);
  var originalData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalData);
};

export { encrypt, decrypt };
