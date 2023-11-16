// Importing the crypto-js library
const CryptoJS = require("crypto-js");

// Generate a random reference number
export const generateCode = (length: number) => {
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


export const array_of_allowed_img_files = ['png', 'jpeg', 'jpg', 'gif', 'png', 'gif'];
export const array_of_allowed_img_file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
// Allowed file size in mb
// Allowed file size in mb
export const allowed_file_size = 2;