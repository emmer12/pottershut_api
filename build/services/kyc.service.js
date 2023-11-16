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
exports.createSub = exports.createKycByCode = exports.getUserKyc = exports.createKyc = exports.getKyc = exports.updateGeoById = exports.getUGeoById = exports.getGeoByField = exports.saveUserGeo = exports.updateIdsById = exports.getUidById = exports.getIdByField = exports.saveUserId = exports.getBasicByField = exports.getBasicById = exports.updateBasicById = exports.saveBasicUser = void 0;
const user_basic_model_1 = __importDefault(require("../models/user_basic.model"));
const user_id_model_1 = __importDefault(require("../models/user_id.model"));
const user_geo_model_1 = __importDefault(require("../models/user_geo.model"));
const user_kyc_1 = __importDefault(require("../models/user_kyc"));
const user_model_1 = __importDefault(require("../models/user.model"));
const user_kyc_sub_1 = __importDefault(require("../models/user_kyc_sub"));
const constants_1 = require("../config/constants");
const utils_1 = require("../utils");
const saveBasicUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   Validate User Information
    const response = yield user_basic_model_1.default.create(payload);
    return response;
});
exports.saveBasicUser = saveBasicUser;
const updateBasicById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_basic_model_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
});
exports.updateBasicById = updateBasicById;
const getBasicById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_basic_model_1.default.findById(id);
});
exports.getBasicById = getBasicById;
const getBasicByField = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_basic_model_1.default.findOne(fields);
});
exports.getBasicByField = getBasicByField;
// Id Verification
const saveUserId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield user_id_model_1.default.create(payload);
    return response;
});
exports.saveUserId = saveUserId;
const getIdByField = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_id_model_1.default.findOne(fields);
});
exports.getIdByField = getIdByField;
const getUidById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_id_model_1.default.findById(id);
});
exports.getUidById = getUidById;
const updateIdsById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_id_model_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
});
exports.updateIdsById = updateIdsById;
// Geo Validation
const saveUserGeo = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield user_geo_model_1.default.create(payload);
    return response;
});
exports.saveUserGeo = saveUserGeo;
const getGeoByField = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_geo_model_1.default.findOne(fields);
});
exports.getGeoByField = getGeoByField;
const getUGeoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_geo_model_1.default.findById(id);
});
exports.getUGeoById = getUGeoById;
const updateGeoById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_geo_model_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
});
exports.updateGeoById = updateGeoById;
const getKyc = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_kyc_1.default.findOne({ user: id });
});
exports.getKyc = getKyc;
const createKyc = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const sub = yield user_kyc_sub_1.default.findOne({
        user: user.id,
        payment_status: constants_1.payment_status.PAID,
    });
    if (!sub)
        throw new Error("Subscription not found");
    const code = (0, utils_1.generateCode)(10);
    const response = yield user_kyc_1.default.create({
        kyc_code: code,
        sub_id: sub.id,
        sub_type: sub.sub_type,
        user: user.id,
    });
    return response;
});
exports.createKyc = createKyc;
const createKycByCode = (user, kyc_code) => __awaiter(void 0, void 0, void 0, function* () {
    const kyc = yield user_kyc_1.default.findOne({
        kyc_code,
    });
    if (!kyc)
        throw new Error("Kyc with this code not found");
    if (kyc.count >= constants_1.kycPricing.PRO.LIMIT)
        throw new Error("Kyc limit reached");
    if (kyc.sub_type == constants_1.sub_type.INDIVIDUAL)
        throw new Error("Code not supported by your current subscription type.");
    // TODO Send email to the root subscriber
    const code = (0, utils_1.generateCode)(18);
    const response = yield user_kyc_1.default.create({
        kyc_code: code,
        sub_id: kyc.sub_id,
        sub_type: constants_1.sub_type.INDIVIDUAL,
        user: user.id,
    });
    yield user_model_1.default.findOneAndUpdate({ _id: user.id }, {
        kyc_enabled: true,
    });
    yield user_kyc_1.default.findOneAndUpdate({ kyc_code: kyc_code }, { $inc: { count: 1 } });
    return response;
});
exports.createKycByCode = createKycByCode;
const createSub = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const sub = yield user_kyc_sub_1.default.findOne({
        user: user.id,
        payment_status: constants_1.payment_status.PAID,
    });
    const amount = data.sub == "regular" ? constants_1.kycPricing.BASIC.PRICE : constants_1.kycPricing.PRO.PRICE;
    if (sub)
        throw new Error("You have already subscribe");
    const code = (0, utils_1.generateCode)(8);
    const response = yield user_kyc_sub_1.default.create({
        amount,
        payment_status: constants_1.payment_status.PAID,
        reference: code,
        sub_type: constants_1.sub_type.INDIVIDUAL,
        user: user.id,
        hash: data.hash,
        chain: data.chain,
    });
    yield user_model_1.default.findOneAndUpdate({ _id: user.id }, {
        kyc_enabled: true,
    });
    return response;
});
exports.createSub = createSub;
const getUserKyc = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_kyc_1.default.find({ user: user.id });
});
exports.getUserKyc = getUserKyc;
