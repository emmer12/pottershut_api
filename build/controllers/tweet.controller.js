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
exports.getUserFeed = exports.handleTweetLikeStatus = exports.updateTweet = exports.getUserTweet = exports.deleteTweet = exports.getTweet = exports.createTweet = void 0;
const httpStatus = __importStar(require("http-status"));
const tweet_model_1 = __importDefault(require("../models/tweet.model"));
const tweet_service_1 = require("../services/tweet.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const createTweet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, body, } = req;
    const sortedTweets = body.sort((a, b) => a.id - b.id);
    const IS_THREAD = body.length > 1;
    const savePayload = {
        message: sortedTweets[0].message,
        user: user._id,
        isThread: IS_THREAD,
        isParent: IS_THREAD ? true : false,
    };
    const parentTweet = yield (0, tweet_service_1.saveTweet)(savePayload);
    if (IS_THREAD) {
        const threads = sortedTweets.splice(0, 1).map((tweet, index) => {
            return {
                message: tweet.message,
                user: user._id,
                isThread: true,
                isParent: false,
                tweetIndex: index + 1,
                parentTweet: parentTweet._id,
            };
        });
        yield (0, tweet_service_1.saveMultipleTweets)(threads);
    }
    res.status(httpStatus.OK).send({ message: "tweet created successfully" });
}));
exports.createTweet = createTweet;
const getTweet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(httpStatus.OK).send({ message: "success" });
}));
exports.getTweet = getTweet;
const getUserTweet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const tweets = yield (0, tweet_service_1.getUserTweets)(user._id);
    res.status(httpStatus.OK).send({ message: "success", tweets });
}));
exports.getUserTweet = getUserTweet;
const deleteTweet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.id;
    const user = req.user;
    if (!tweetId) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "tweet id is required" });
    }
    const tweet = yield (0, tweet_service_1.getTweetById)(tweetId);
    if (!tweet) {
        return res
            .status(httpStatus.NOT_FOUND)
            .send({ message: "Tweet not found" });
    }
    else {
        if (tweet.user.toString() !== user._id.toString()) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .send({ message: "Unauthorized" });
        }
        else {
            yield (0, tweet_service_1.deleteTweetbyId)(tweetId);
            return res
                .status(httpStatus.OK)
                .send({ message: "Tweet deleted successfully" });
        }
    }
}));
exports.deleteTweet = deleteTweet;
const updateTweet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.id;
    const { message } = req.body;
    const user = req.user;
    if (!tweetId) {
        res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "tweet id is required" });
    }
    const tweet = yield (0, tweet_service_1.getTweetById)(tweetId);
    if (!tweet) {
        res.status(httpStatus.NOT_FOUND).send({ message: "Tweet not found" });
    }
    else {
        if (tweet.user.toString() !== user._id.toString()) {
            res.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorized" });
        }
        else {
            yield (0, tweet_service_1.updateTweetMessageById)(tweetId, message);
            res.status(httpStatus.OK).send({ message: "Tweet updated successfully" });
        }
    }
}));
exports.updateTweet = updateTweet;
const handleTweetLikeStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.id;
    const { like } = req.body;
    const user = req.user;
    if (!tweetId) {
        res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "tweet id is required" });
    }
    const tweet = yield (0, tweet_service_1.getTweetById)(tweetId);
    if (!tweet) {
        res.status(httpStatus.NOT_FOUND).send({ message: "Tweet not found" });
    }
    else {
        if (tweet.user.toString() !== user._id.toString()) {
            res.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorized" });
        }
        else {
            if (like) {
                yield (0, tweet_service_1.likeTweet)(String(tweet._id), String(user._id));
            }
            else {
                yield (0, tweet_service_1.unlikeTweet)(String(tweet._id));
            }
            res.status(httpStatus.OK).send({ message: "Tweet updated successfully" });
        }
    }
}));
exports.handleTweetLikeStatus = handleTweetLikeStatus;
const getUserFeed = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const currentUser = req.user._id;
    const tweets = yield tweet_model_1.default.aggregate([
        {
            $match: {
                user: { $ne: currentUser },
            },
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "tweet",
                as: "likes",
            },
        },
        {
            $lookup: {
                from: "likes",
                let: { tweetId: "$_id", userId: currentUser },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$tweet", "$$tweetId"] },
                                    { $eq: ["$user", "$$userId"] },
                                ],
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                        },
                    },
                ],
                as: "isLikedByCurrentUser",
            },
        },
        {
            $addFields: {
                totalLikes: { $size: "$likes" },
                isLikedByCurrentUser: {
                    $cond: {
                        if: { $gt: [{ $size: "$isLikedByCurrentUser" }, 0] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                likes: 0,
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
        {
            $skip: skip,
        },
        {
            $limit: limit,
        },
    ]);
    const total = yield tweet_model_1.default.countDocuments({ user: { $ne: currentUser } });
    res.status(httpStatus.OK).send({ data: tweets, total, page });
}));
exports.getUserFeed = getUserFeed;
