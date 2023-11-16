"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const config_1 = __importDefault(require("../config/config"));
var CryptoJS = require("crypto-js");
const encrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), config_1.default.crypto.secret).toString();
};
exports.encrypt = encrypt;
const decrypt = (data) => {
    var bytes = CryptoJS.AES.decrypt(data, config_1.default.crypto.secret);
    var originalData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(originalData);
};
exports.decrypt = decrypt;
