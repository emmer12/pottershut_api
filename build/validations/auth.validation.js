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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resend = exports.otp = exports.verifyEmail = exports.resetPassword = exports.forgotPassword = exports.refreshTokens = exports.logout = exports.login = exports.register = void 0;
const Joi = __importStar(require("joi"));
const { password } = require("./custom.validation");
const register = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required().email(),
        // user_type: Joi.string().required(),
    }),
};
exports.register = register;
const login = {
    body: Joi.object().keys({
        password: Joi.string().required(),
        email: Joi.string().required().email(),
    }),
};
exports.login = login;
const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};
exports.logout = logout;
const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};
exports.refreshTokens = refreshTokens;
const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        code: Joi.string().length(4).required(),
    }),
};
exports.forgotPassword = forgotPassword;
const resetPassword = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    }),
};
exports.resetPassword = resetPassword;
const verifyEmail = {
    query: Joi.object().keys({
        token: Joi.string().required(),
    }),
};
exports.verifyEmail = verifyEmail;
const otp = {
    body: Joi.object().keys({
        verification_key: Joi.string().required(),
        check: Joi.string().required(),
        otp: Joi.number().required(),
    }),
};
exports.otp = otp;
const resend = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
};
exports.resend = resend;
