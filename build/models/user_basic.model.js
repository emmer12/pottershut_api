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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const plugins_1 = require("./plugins");
const userBasicSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    middle_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    marital_status: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    disability: {
        type: Boolean,
        required: true,
        trim: true,
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
    },
    religion: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    socials: {
        type: [String],
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
userBasicSchema.plugin(plugins_1.toJSON);
userBasicSchema.plugin(plugins_1.paginate);
const UserBasic = mongoose_1.default.model("UserBasic", userBasicSchema);
exports.default = UserBasic;
