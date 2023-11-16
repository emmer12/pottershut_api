import * as httpStatus from "http-status";
import User from "../models/user.model";
import ApiError from "../utils/ApiError";
import { decrypt } from "./crypto.service";
import Otp from "../models/otp.model";
import { verifyOtp } from "./otp.service";

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const usr = await User.create(userBody);
  return usr.toObject();
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id).lean();
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getUserByAddress = async (address) => {
  return User.findOne({ address }).lean();
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(userId, updateBody, {
    new: true,
  }).lean();

  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await User.deleteOne({ _id: userId });
  return "user deleted successfully";
};

const searchUsersByName = async (keyword, page, perPage) => {
  return await User.find({ userName: { $regex: keyword, $options: "i" } })
    .limit(parseInt(perPage))
    .skip(page * perPage);
};

const verifyAccount = async (reqBody) => {
  const { check, otp, verification_key } = reqBody;
  const data = decrypt(verification_key);

  if (check !== data.check)
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid data");

  let otp_instance = await Otp.findOne({ _id: data.otp_id });

  if (!otp_instance) throw new ApiError(httpStatus.NOT_FOUND, "Not found");

  if (otp_instance.verified == true)
    throw new ApiError(httpStatus.BAD_REQUEST, "Otp has already been used");

  if (new Date() > otp_instance.expiration_time)
    throw new ApiError(httpStatus.BAD_REQUEST, "Otp Expired");

  const isValid = await verifyOtp(otp_instance.otp, otp.toString());
  console.log(isValid);

  if (!isValid) throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Otp");

  otp_instance.verified = true;

  await otp_instance.save();
  await User.findOneAndUpdate({ email: check }, { account_verification: true });

  return "Otp verified successfully";
};

const resendOtp = async (reqBody) => {
  const user = await User.findOne({ email: reqBody.email });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "Not Found");
  return user;
};

export {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getUserByAddress,
  searchUsersByName,
  verifyAccount,
  resendOtp,
};
