"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tweetSchema = new mongoose_1.Schema({
    message: { type: String, required: true },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    parentTweet: { type: mongoose_1.Types.ObjectId, ref: "Tweet", default: null },
    isThread: { type: Boolean, required: true, default: false },
    isParent: { type: Boolean, required: true, default: true },
    tweetIndex: { type: Number, required: false, default: 0 },
}, { timestamps: true });
const Tweet = (0, mongoose_1.model)("Tweet", tweetSchema);
exports.default = Tweet;
