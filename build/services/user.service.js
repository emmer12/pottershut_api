"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtp = exports.verifyAccount = exports.searchUsersByName = exports.getUserByAddress = exports.deleteUserById = exports.updateUserById = exports.getUserByEmail = exports.getUserById = exports.createUser = void 0;
const httpStatus = __importStar(require("http-status"));
const user_model_1 = __importDefault(require("../models/user.model"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const crypto_service_1 = require("./crypto.service");
const otp_model_1 = __importDefault(require("../models/otp.model"));
const otp_service_1 = require("./otp.service");
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.default.isEmailTaken(userBody.email)) {
        throw new ApiError_1.default(httpStatus.BAD_REQUEST, "Email already taken");
    }
    const usr = yield user_model_1.default.create(userBody);
    return usr.toObject();
});
exports.createUser = createUser;
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.findById(id).lean();
});
exports.getUserById = getUserById;
/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.findOne({ email });
});
exports.getUserByEmail = getUserByEmail;
const getUserByAddress = (address) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.findOne({ address }).lean();
});
exports.getUserByAddress = getUserByAddress;
/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = (userId, updateBody) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(userId, updateBody, {
        new: true,
    }).lean();
    return user;
});
exports.updateUserById = updateUserById;
/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield getUserById(userId);
    if (!user) {
        throw new ApiError_1.default(httpStatus.NOT_FOUND, "User not found");
    }
    yield user_model_1.default.deleteOne({ _id: userId });
    return "user deleted successfully";
});
exports.deleteUserById = deleteUserById;
const searchUsersByName = (keyword, page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find({ userName: { $regex: keyword, $options: "i" } })
        .limit(parseInt(perPage))
        .skip(page * perPage);
});
exports.searchUsersByName = searchUsersByName;
const verifyAccount = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { check, otp, verification_key } = reqBody;
    const data = (0, crypto_service_1.decrypt)(verification_key);
    if (check !== data.check)
        throw new ApiError_1.default(httpStatus.BAD_REQUEST, "Invalid data");
    let otp_instance = yield otp_model_1.default.findOne({ _id: data.otp_id });
    if (!otp_instance)
        throw new ApiError_1.default(httpStatus.NOT_FOUND, "Not found");
    if (otp_instance.verified == true)
        throw new ApiError_1.default(httpStatus.BAD_REQUEST, "Otp has already been used");
    if (new Date() > otp_instance.expiration_time)
        throw new ApiError_1.default(httpStatus.BAD_REQUEST, "Otp Expired");
    const isValid = yield (0, otp_service_1.verifyOtp)(otp_instance.otp, otp.toString());
    console.log(isValid);
    if (!isValid)
        throw new ApiError_1.default(httpStatus.BAD_REQUEST, "Invalid Otp");
    otp_instance.verified = true;
    yield otp_instance.save();
    yield user_model_1.default.findOneAndUpdate({ email: check }, { account_verification: true });
    return "Otp verified successfully";
});
exports.verifyAccount = verifyAccount;
const resendOtp = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: reqBody.email });
    if (!user)
        throw new ApiError_1.default(httpStatus.NOT_FOUND, "Not Found");
    return user;
});
exports.resendOtp = resendOtp;
