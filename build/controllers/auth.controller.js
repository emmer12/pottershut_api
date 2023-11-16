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
exports.googleAuth = exports.currentUser = exports.resend = exports.verify = exports.logout = exports.login = exports.register = void 0;
const httpStatus = __importStar(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_service_1 = require("../services/user.service");
const token_service_1 = require("../services/token.service");
const otp_service_1 = require("../services/otp.service");
const mail_service_1 = require("../services/mail.service");
const kyc_service_1 = require("../services/kyc.service");
const passport = require("passport");
const register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.createUser)(req.body);
    const { otp, verification_key } = yield (0, otp_service_1.generateOtp)(user);
    (0, mail_service_1.sendOtp)(otp, user.email);
    res
        .status(httpStatus.OK)
        .send({ message: "user created successfully", verification_key });
}));
exports.register = register;
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, user_service_1.getUserByEmail)(email);
    if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).send({
            message: "Invalid credentials",
        });
    }
    if (req.params.isAdmin) {
        if (user.role !== 'admin') {
            return res.status(httpStatus.UNAUTHORIZED).send({
                message: "Unauthorized",
            });
        }
    }
    if (!user.account_verification) {
        return res.status(httpStatus.UNAUTHORIZED).send({
            message: "This account has not been verified",
        });
    }
    const isPasswordMatch = yield user.isPasswordMatch(password);
    if (!isPasswordMatch) {
        return res.status(httpStatus.UNAUTHORIZED).send({
            message: "Invalid credentials",
        });
    }
    const token = yield (0, token_service_1.generateAuthTokens)(user);
    res.status(httpStatus.OK).send({ message: "login successful", user, token });
}));
exports.login = login;
const googleAuth = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const token = yield (0, token_service_1.generateAuthTokens)(user);
    res.status(httpStatus.OK).send({ message: "login successful", user, token });
}));
exports.googleAuth = googleAuth;
const logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    yield (0, token_service_1.removeToken)(user);
    res.status(httpStatus.OK).send({
        message: "logout successful",
        status: true,
    });
}));
exports.logout = logout;
const verify = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_service_1.verifyAccount)(req.body);
    res.status(httpStatus.OK).send({
        message: "Otp Verified",
        status: true,
    });
}));
exports.verify = verify;
const resend = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.resendOtp)(req.body);
    const { otp, verification_key } = yield (0, otp_service_1.generateOtp)(user);
    console.log(otp);
    res.status(httpStatus.OK).send({ message: "Otp resent", verification_key });
}));
exports.resend = resend;
const currentUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kyc = yield (0, kyc_service_1.getUserKyc)(req.user);
    res.status(httpStatus.OK).send({ user: req.user, kyc });
}));
exports.currentUser = currentUser;
