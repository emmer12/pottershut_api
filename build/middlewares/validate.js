"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const pick_1 = __importDefault(require("../utils/pick"));
const Joi = require("joi");
const httpStatus = require("http-status");
const validate = (schema) => (req, res, next) => {
    const validSchema = (0, pick_1.default)(schema, ["params", "query", "body"]);
    const object = (0, pick_1.default)(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" }, abortEarly: false })
        .validate(object);
    if (error) {
        const errorMessage = error.details
            .map((details) => details.message)
            .join(", ");
        return next(new ApiError_1.default(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validate;
