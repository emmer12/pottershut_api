"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeTweet = exports.likeTweet = exports.getUserTweets = exports.deleteTweetbyId = exports.updateTweetMessageById = exports.getTweetById = exports.saveMultipleTweets = exports.saveTweet = void 0;
const like_model_1 = __importDefault(require("../models/like.model"));
const tweet_model_1 = __importDefault(require("../models/tweet.model"));
const saveTweet = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield tweet_model_1.default.create([payload]);
    return response[0];
});
exports.saveTweet = saveTweet;
const saveMultipleTweets = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweet_model_1.default.insertMany(payload);
});
exports.saveMultipleTweets = saveMultipleTweets;
const getTweetById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweet_model_1.default.findById(id);
});
exports.getTweetById = getTweetById;
const updateTweetMessageById = (id, message) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweet_model_1.default.findOneAndUpdate({ _id: id }, { message }, { new: true });
});
exports.updateTweetMessageById = updateTweetMessageById;
const deleteTweetbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweet_model_1.default.deleteOne({ _id: id });
});
exports.deleteTweetbyId = deleteTweetbyId;
const getUserTweets = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tweet_model_1.default.find({ user }).sort({ createdAt: -1 });
});
exports.getUserTweets = getUserTweets;
const likeTweet = (tweet, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield like_model_1.default.create({
        tweet,
        user,
    });
});
exports.likeTweet = likeTweet;
const unlikeTweet = (tweet) => __awaiter(void 0, void 0, void 0, function* () {
    return yield like_model_1.default.deleteOne({
        tweet,
    });
});
exports.unlikeTweet = unlikeTweet;
