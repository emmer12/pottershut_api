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
const tweet_controller_1 = require("../../controllers/tweet.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const tweetValidations = __importStar(require("../../validations/tweet.validation"));
const tweetRoute = express_1.default.Router();
tweetRoute.get("/feed", (0, auth_1.default)("tweet"), tweet_controller_1.getUserFeed);
tweetRoute.get("/", (0, auth_1.default)("tweet"), tweet_controller_1.getUserTweet);
tweetRoute.post("/create", [(0, auth_1.default)("tweet"), (0, validate_1.default)(tweetValidations.createTweet)], tweet_controller_1.createTweet);
tweetRoute.delete("/:id", (0, auth_1.default)("tweet"), tweet_controller_1.deleteTweet);
tweetRoute.patch("/:id", [(0, auth_1.default)("tweet"), (0, validate_1.default)(tweetValidations.tweetUpdate)], tweet_controller_1.updateTweet);
tweetRoute.patch("/like/:id", [(0, auth_1.default)("tweet"), (0, validate_1.default)(tweetValidations.likeTweet)], tweet_controller_1.handleTweetLikeStatus);
exports.default = tweetRoute;
