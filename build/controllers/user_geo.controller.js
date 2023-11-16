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
exports.createGeoUser = void 0;
const httpStatus = __importStar(require("http-status"));
const kyc_service_1 = require("../services/kyc.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const createGeoUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, body } = req;
    const savePayload = {
        city: body.city,
        state: body.state,
        country: body.country,
        home_address_1: body.home_address_1,
        home_address_2: body.home_address_2,
        office_address_1: body.office_address_1,
        office_address_2: body.office_address_2,
        ip: body.ip,
        long: body.long,
        lat: body.lat,
        user: user.id,
        zip: body.zip,
    };
    const uid = yield (0, kyc_service_1.getGeoByField)({ user: user.id });
    if (uid) {
        yield (0, kyc_service_1.updateGeoById)(uid._id.toString(), savePayload);
    }
    else {
        yield (0, kyc_service_1.saveUserGeo)(savePayload);
    }
    res
        .status(httpStatus.OK)
        .send({ message: "basic information submitted successfully" });
}));
exports.createGeoUser = createGeoUser;
