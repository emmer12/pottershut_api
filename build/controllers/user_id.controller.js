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
exports.createIdUser = void 0;
const httpStatus = __importStar(require("http-status"));
const kyc_service_1 = require("../services/kyc.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const fileupload_service_1 = require("../services/fileupload.service");
const createIdUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, body } = req;
    // const { file_path } = await handleSingleFile(req, true);
    const files = yield (0, fileupload_service_1.handleMultipleFile)(req, true);
    const savePayload = {
        id_type: body.id_type,
        expiration_date: body.expiration_date,
        card_number: body.card_number,
        doc_path: files.find((f) => f.field == "doc").file_path || "",
        proof_path: files.find((f) => f.field == "proof").file_path || "",
        user: user.id,
    };
    const uid = yield (0, kyc_service_1.getIdByField)({ user: user.id });
    if (uid) {
        yield (0, kyc_service_1.updateIdsById)(uid._id.toString(), savePayload);
    }
    else {
        yield (0, kyc_service_1.saveUserId)(savePayload);
    }
    res
        .status(httpStatus.OK)
        .send({ message: "basic information submitted successfully" });
}));
exports.createIdUser = createIdUser;
