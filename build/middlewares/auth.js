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
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const passport = require("passport");
const httpStatus = require("http-status");
const { roleRights } = require("../config/roles");
const verifyCallback = (req, resolve, reject, requiredRights) => (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (err || info || !user) {
        return reject(new ApiError_1.default(httpStatus.UNAUTHORIZED, "Please authenticate"));
    }
    req.user = user;
    if (requiredRights.length) {
        const userRights = roleRights.get(user.role);
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights) {
            return reject(new ApiError_1.default(httpStatus.FORBIDDEN, "Forbidden"));
        }
    }
    if (requiredRights == "kyc" && !user.kyc_enabled) {
        return reject(new ApiError_1.default(httpStatus.FORBIDDEN, "Forbidden, In order to utilize this endpoint, kindly make the payment for the KYC."));
    }
    resolve();
});
const auth = (...requiredRights) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
});
exports.default = auth;
