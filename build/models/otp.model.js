"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const plugins_1 = require("./plugins");
const otpSchema = new mongoose_1.Schema({
    otp: {
        type: String,
        required: true,
    },
    expiration_time: {
        type: Date,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
otpSchema.plugin(plugins_1.toJSON);
const Token = (0, mongoose_1.model)("Otp", otpSchema);
exports.default = Token;
