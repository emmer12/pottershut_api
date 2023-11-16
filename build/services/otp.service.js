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
exports.verifyOtp = exports.generateOtp = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
const date_service_1 = require("./date.service");
const crypto_service_1 = require("./crypto.service");
const generateOtp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = otp_generator_1.default.generate(4, {
        digit: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    const encryptedOtp = yield crypt(otp);
    const otp_instance = yield saveOtp(encryptedOtp);
    const details = {
        check: payload.email,
        timestamp: new Date(),
        success: true,
        message: "OTP sent to user",
        otp_id: otp_instance._id,
    };
    const verification_key = (0, crypto_service_1.encrypt)(details);
    return {
        verification_key,
        otp,
    };
});
exports.generateOtp = generateOtp;
const verifyOtp = (databaseOtp, otp) => {
    return bcryptjs_1.default.compare(otp, databaseOtp);
};
exports.verifyOtp = verifyOtp;
const crypt = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.hash(otp, 8);
});
const saveOtp = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const expiration_time = (0, date_service_1.addMinuteToDate)(now, 15);
    const otpDoc = otp_model_1.default.create({
        otp,
        expiration_time,
    });
    return otpDoc;
});
