"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const plugins_1 = require("./plugins");
const constants_1 = require("../config/constants");
const UserIdSchema = new mongoose_1.Schema({
    id_type: {
        type: String,
        enum: Object.values(constants_1.id_type),
        required: true,
    },
    expiration_date: {
        type: Date,
        required: true,
    },
    card_number: {
        type: String,
        required: true,
    },
    doc_path: {
        type: String,
    },
    proof_path: {
        type: String,
    },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
UserIdSchema.plugin(plugins_1.toJSON);
const UserId = (0, mongoose_1.model)("UserId", UserIdSchema);
exports.default = UserId;
