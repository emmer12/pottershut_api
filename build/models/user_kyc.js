"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const plugins_1 = require("./plugins");
const constants_1 = require("../config/constants");
const UserKycSchema = new mongoose_1.Schema({
    sub_type: {
        type: String,
        enum: Object.values(constants_1.sub_type),
        required: true,
    },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    sub_id: { type: mongoose_1.Types.ObjectId, ref: "UserSub" },
    kyc_code: {
        type: String,
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    count: {
        type: Number,
        default: 1,
    },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
UserKycSchema.plugin(plugins_1.toJSON);
const UserKyc = (0, mongoose_1.model)("UserKyc", UserKycSchema);
exports.default = UserKyc;
