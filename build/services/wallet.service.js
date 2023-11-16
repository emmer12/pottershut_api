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
exports.updateWalletById = exports.getWalletByUserId = exports.createUserWallet = void 0;
const wallet_model_1 = __importDefault(require("../models/wallet.model"));
const createUserWallet = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield wallet_model_1.default.create(payload);
});
exports.createUserWallet = createUserWallet;
const getWalletByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.default.findOne({ user: userId });
    //   if (!wallet) {
    //     throw new Error("Wallet not found");
    //   }
    return wallet;
});
exports.getWalletByUserId = getWalletByUserId;
const updateWalletById = (walletId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedWallet = yield wallet_model_1.default.findByIdAndUpdate(walletId, { $set: updates }, { new: true });
    if (!updatedWallet) {
        throw new Error("Wallet not found");
    }
    return updatedWallet;
});
exports.updateWalletById = updateWalletById;
