"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendKycNotification = exports.sendOtp = void 0;
const config_1 = __importDefault(require("../config/config"));
const mailer_1 = require("../config/mailer");
const sendOtp = (otp, toEmail) => {
    const content = `
  <div style="max-width: 600px; ">
    <p><span style="font-weight: 400;">Hi there, </span></p>
    <p>&nbsp;</p>
    <p><span style="font-weight: 400;">Your verification code is:</span></p>
    <p><span style="font-weight: 400;">${otp}</span></p>
    <p><span style="font-weight: 400;">The verification code will be valid for 15 minutes. </span></p>
    <p><span style="font-weight: 400;">This is an automated message, please do not replay</span></p>
    <p>&nbsp;</p>
    <p><span style="font-weight: 400;">Thank you!</span></p>
    <p><span style="font-weight: 400;">Regards,</span></p>
    <p><span style="font-weight: 400;">VetMe</span></p>
  </div>
`;
    return (0, mailer_1.mailer)(content, `Otp Verification`, toEmail, "high");
};
exports.sendOtp = sendOtp;
const sendKycNotification = () => {
    const content = `
  <div style="max-width: 600px; ">
    <p><span style="font-weight: 400;">Hi there, </span></p>
    <p>&nbsp;</p>
    <p><span style="font-weight: 400;">A user just completed KYC</span></p>
    <p><span style="font-weight: 400;">Regards,</span></p>
    <p><span style="font-weight: 400;">VetMe</span></p>
  </div>
`;
    const toEmail = config_1.default.adminEmail;
    return (0, mailer_1.mailer)(content, `KYC Notification`, toEmail, "high");
};
exports.sendKycNotification = sendKycNotification;
