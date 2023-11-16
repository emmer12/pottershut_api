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
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../config/constants");
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const config_1 = __importDefault(require("../config/config"));
mongoose_1.default.plugin(mongoose_slug_generator_1.default);
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, slug: "title" },
    body: { type: String, required: true },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", default: null },
    category: { type: mongoose_1.Types.ObjectId, ref: "BlogCategory", required: true },
    preview: { type: String, required: false },
    tags: { type: Array, required: false },
    visibility_status: {
        type: String, enum: [constants_1.visibility_status.DRAFT, constants_1.visibility_status.LIVE], default: constants_1.visibility_status.DRAFT
    },
    meta_title: { type: String, required: false },
    meta_description: { type: String, required: false },
}, { timestamps: true });
const Blog = (0, mongoose_1.model)("Blog", blogSchema);
// Define a virtual property for the fullname
blogSchema.virtual('preview_url').get(function () {
    return `${config_1.default.server_url}/${this.preview}`;
});
exports.default = Blog;
