"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const walletSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, required: true, default: 0 },
}, { timestamps: true });
const Wallet = (0, mongoose_1.model)("Wallet", walletSchema);
exports.default = Wallet;
