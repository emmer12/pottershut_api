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
exports.createKycSub = exports.createKycCode = exports.startKyc = exports.generatePdf = exports.processCallback = exports.getBasicUser = exports.updateBasicById = exports.createBasicUser = void 0;
const httpStatus = __importStar(require("http-status"));
const user_basic_model_1 = __importDefault(require("../models/user_basic.model"));
const kyc_service_1 = require("../services/kyc.service");
Object.defineProperty(exports, "updateBasicById", { enumerable: true, get: function () { return kyc_service_1.updateBasicById; } });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const mail_service_1 = require("../services/mail.service");
const pdf_service_1 = require("../services/pdf.service");
const createBasicUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, body } = req;
    const savePayload = {
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        state: body.state,
        marital_status: body.marital_status,
        phone: body.phone,
        socials: JSON.parse(body.socials),
        disability: body.disability,
        nationality: body.nationality,
        religion: body.religion,
        dob: body.dob,
        user: user.id,
        email: user.email,
    };
    const basic = yield (0, kyc_service_1.getBasicByField)({ user: user.id });
    if (basic) {
        yield (0, kyc_service_1.updateBasicById)(basic._id.toString(), savePayload);
    }
    else {
        yield (0, kyc_service_1.saveBasicUser)(savePayload);
    }
    res
        .status(httpStatus.OK)
        .send({ message: "basic information submitted successfully" });
}));
exports.createBasicUser = createBasicUser;
const updateTweet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const basicId = req.params.id;
    const data = req.body;
    const user = req.user;
    if (!basicId) {
        res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "User basic id is required" });
    }
    const basic = yield (0, kyc_service_1.getBasicById)(basicId);
    if (!basic) {
        res.status(httpStatus.NOT_FOUND).send({ message: "Basic User not found" });
    }
    else {
        if (basic.user.toString() !== user._id.toString()) {
            res.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorized" });
        }
        else {
            yield (0, kyc_service_1.updateBasicById)(basicId, data);
            res
                .status(httpStatus.OK)
                .send({ message: "Basic User updated successfully" });
        }
    }
}));
const getBasicUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    console.log(user);
    const basic = yield (0, kyc_service_1.getBasicByField)({ user: user.id });
    res.status(httpStatus.OK).send({ basic });
}));
exports.getBasicUser = getBasicUser;
const processCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req, "Got here");
    (0, mail_service_1.sendKycNotification)();
    res.status(httpStatus.OK).send({});
});
exports.processCallback = processCallback;
const generatePdf = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user.is_verified)
        throw new Error("Account not verified. Please complete your kyc");
    const user = yield user_basic_model_1.default.findOne({ user: req.user.id });
    const now = Date.now().toString();
    const data = {
        name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
        email: req.user.email,
        path: `public/certificates/${user.first_name}-${user.middle_name}-${now}.pdf`,
    };
    yield (0, pdf_service_1.generateCert)(data, res);
}));
exports.generatePdf = generatePdf;
const startKyc = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const kyc = yield (0, kyc_service_1.getKyc)(user.id);
    if (kyc) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "You have Already Started Kyc" });
    }
    const k = yield (0, kyc_service_1.createKyc)(user);
    res.status(httpStatus.OK).send({ kyc: k });
}));
exports.startKyc = startKyc;
const createKycCode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const kyc = yield (0, kyc_service_1.getKyc)(user.id);
    if (kyc) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "You have Already Started Kyc" });
    }
    const k = yield (0, kyc_service_1.createKycByCode)(user, req.body.code);
    res.status(httpStatus.OK).send({ kyc: k });
}));
exports.createKycCode = createKycCode;
const createKycSub = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const data = req.body;
    const sub = yield (0, kyc_service_1.createSub)(user, data);
    res.status(httpStatus.OK).send({ sub });
}));
exports.createKycSub = createKycSub;
