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
exports.createGeo = exports.createId = exports.updateBasic = exports.createBasic = void 0;
const Joi = __importStar(require("joi"));
const createBasic = {
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        middle_name: Joi.string(),
        state: Joi.string().required(),
        marital_status: Joi.string().required(),
        phone: Joi.string().required(),
        socials: Joi.string().required(),
        disability: Joi.boolean().required(),
        nationality: Joi.string().required(),
        religion: Joi.string().required(),
        dob: Joi.string().required(),
        email: Joi.string().required(),
    }),
};
exports.createBasic = createBasic;
const updateBasic = {
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        middle_name: Joi.string(),
        state: Joi.string().required(),
        marital_status: Joi.string().required(),
        phone: Joi.string().required(),
        socials: Joi.string().required(),
        disability: Joi.string().required(),
        nationality: Joi.string().required(),
        religion: Joi.string().required(),
        dob: Joi.string().required(),
        email: Joi.string().required(),
    }),
};
exports.updateBasic = updateBasic;
const createId = {
    body: Joi.object().keys({
        id_type: Joi.string().required(),
        expiration_date: Joi.date().required(),
        card_number: Joi.string().required(),
        doc: Joi.string(),
        proof: Joi.string(),
    }),
};
exports.createId = createId;
const createGeo = {
    body: Joi.object().keys({
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        home_address_1: Joi.string().required(),
        home_address_2: Joi.string(),
        office_address_1: Joi.string(),
        office_address_2: Joi.string(),
        zip: Joi.number().required(),
        ip: Joi.required(),
        long: Joi.number().required(),
        lat: Joi.number().required(),
    }),
};
exports.createGeo = createGeo;
