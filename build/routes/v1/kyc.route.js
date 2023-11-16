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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_basic_controller_1 = require("../../controllers/user_basic.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const kycUserValidations = __importStar(require("../../validations/kyc_user.validation"));
const user_id_controller_1 = require("../../controllers/user_id.controller");
const user_geo_controller_1 = require("../../controllers/user_geo.controller");
const kycRoute = express_1.default.Router();
// Basic
kycRoute.get("/", (req, res) => {
    res.send("VetMe Kyc Api Endpoint");
});
kycRoute.get("/basic", [(0, auth_1.default)("kyc")], user_basic_controller_1.getBasicUser);
kycRoute.post("/start", [(0, auth_1.default)("kyc")], user_basic_controller_1.startKyc);
kycRoute.post("/validate-code", (0, auth_1.default)(), user_basic_controller_1.createKycCode);
kycRoute.post("/shuftipro/callback", [(0, auth_1.default)("kyc")], user_basic_controller_1.processCallback);
kycRoute.post("/create-sub", (0, auth_1.default)(), user_basic_controller_1.createKycSub);
kycRoute.post("/basic/create", [(0, auth_1.default)("kyc"), (0, validate_1.default)(kycUserValidations.createBasic)], user_basic_controller_1.createBasicUser);
kycRoute.patch("/basic/:id", [(0, auth_1.default)("kyc"), (0, validate_1.default)(kycUserValidations.updateBasic)], user_basic_controller_1.updateBasicById);
kycRoute.post("/id/create", [(0, auth_1.default)("kyc"), (0, validate_1.default)(kycUserValidations.createId)], user_id_controller_1.createIdUser);
kycRoute.post("/geo/create", [(0, auth_1.default)("kyc"), (0, validate_1.default)(kycUserValidations.createGeo)], user_geo_controller_1.createGeoUser);
kycRoute.get("/generate-certificate", [(0, auth_1.default)("kyc")], user_basic_controller_1.generatePdf);
kycRoute.post("/pdf-test", user_basic_controller_1.generatePdf);
exports.default = kycRoute;
