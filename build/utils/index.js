"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = void 0;
// Importing the crypto-js library
const CryptoJS = require("crypto-js");
// Generate a random reference number
const generateCode = (length) => {
    // Generate a random number between 0 and 999999
    const randomNumber = Math.floor(Math.random() * 1000000);
    // Convert the random number to a string
    const randomString = randomNumber.toString();
    // Generate a random hash using SHA-256
    const hash = CryptoJS.SHA256(randomString).toString();
    // Take the first 8 characters of the hash as the reference number
    const referenceNumber = hash.substring(0, length);
    // Return the generated reference number
    return referenceNumber;
};
exports.generateCode = generateCode;
