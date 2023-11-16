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
exports.createBlogCategory = exports.createBlog = void 0;
const Joi = __importStar(require("joi"));
const createBlog = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        category: Joi.string().required(),
        body: Joi.string().required(),
        visibility_status: Joi.string().required(),
        tags: Joi.array().empty(),
        preview: Joi.string(),
    }),
};
exports.createBlog = createBlog;
const createBlogCategory = {
    body: Joi.object().keys({
        body: Joi.string().required(),
    }),
};
exports.createBlogCategory = createBlogCategory;
