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
exports.mailer = void 0;
const config_1 = __importDefault(require("./config"));
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: config_1.default.mail.host,
    port: config_1.default.mail.port,
    auth: {
        user: config_1.default.mail.user,
        pass: config_1.default.mail.pass,
    },
});
const mailer = (htmlBody, subject, to, priority) => __awaiter(void 0, void 0, void 0, function* () {
    let info = yield transporter.sendMail({
        from: '"VetMe Team" <info@vetmeblock.com>',
        to: to,
        subject: subject,
        html: htmlBody,
        headers: {
            priority: priority !== null && priority !== void 0 ? priority : "normal",
        },
    });
    console.log("Message sent: %s", info.messageId);
});
exports.mailer = mailer;
