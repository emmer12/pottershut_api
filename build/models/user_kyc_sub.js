"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const plugins_1 = require("./plugins");
const constants_1 = require("../config/constants");
const UserSubSchema = new mongoose_1.Schema({
    sub_type: {
        type: String,
        enum: Object.values(constants_1.sub_type),
        default: constants_1.sub_type.INDIVIDUAL,
        required: true,
    },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    payment_status: {
        type: String,
        enum: Object.values(constants_1.payment_status),
        default: constants_1.payment_status.UNPAID,
        required: true,
    },
    amount: {
        type: Number,
    },
    reference: {
        type: String,
    },
    hash: {
        type: String,
    },
    chain: {
        type: Number,
    },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
UserSubSchema.plugin(plugins_1.toJSON);
const UserSub = (0, mongoose_1.model)("UserSub", UserSubSchema);
exports.default = UserSub;
