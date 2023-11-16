"use strict";
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
const jwt = require("jsonwebtoken");
const moment_1 = __importDefault(require("moment"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const config_1 = __importDefault(require("../config/config"));
const httpStatus = require("http-status");
const userService = require("./user.service");
const { Token } = require("../models");
const { tokenTypes } = require("../config/tokens");
/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, type, secret = config_1.default.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: (0, moment_1.default)().unix(),
        type,
    };
    return jwt.sign(payload, secret);
};
/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = (token, userId, type, blacklisted = false) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenDoc = yield Token.create({
        token,
        user: userId,
        type,
        blacklisted,
    });
    return tokenDoc;
});
/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = (token, type) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = jwt.verify(token, config_1.default.jwt.secret);
    const tokenDoc = yield Token.findOne({
        token,
        type,
        user: payload.sub,
        blacklisted: false,
    });
    if (!tokenDoc) {
        throw new Error("Token not found");
    }
    return tokenDoc;
});
/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = generateToken(user._id, tokenTypes.ACCESS);
    yield saveToken(accessToken, user._id, tokenTypes.ACCESS);
    return accessToken;
});
/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserByEmail(email);
    if (!user) {
        throw new ApiError_1.default(httpStatus.NOT_FOUND, "No users found with this email");
    }
    const expires = (0, moment_1.default)().add(config_1.default.jwt.resetPasswordExpirationMinutes, "minutes");
    const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
    yield saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
    return resetPasswordToken;
});
/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const expires = (0, moment_1.default)().add(config_1.default.jwt.verifyEmailExpirationMinutes, "minutes");
    const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
    yield saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
    return verifyEmailToken;
});
const removeToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield Token.findOneAndDelete({ user: user.id });
    return res;
});
module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    removeToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken,
};
