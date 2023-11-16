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
exports.getCategoryById = exports.deleteCategoryById = exports.getCategories = exports.updateCategoryById = exports.saveCategory = exports.getUserBlogs = exports.updateBlogById = exports.deleteBlogById = exports.getBlogBySlug = exports.getBlogById = exports.saveBlog = void 0;
const blog_model_1 = __importDefault(require("../models/blog.model"));
const blog_category_model_1 = __importDefault(require("../models/blog.category.model"));
const constants_1 = require("../config/constants");
const saveBlog = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    payload.user = user._id;
    const response = yield blog_model_1.default.create(payload);
    return response[0];
});
exports.saveBlog = saveBlog;
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.findById(id);
});
exports.getBlogById = getBlogById;
const getBlogBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.findOne({
        slug: slug,
        visibility_status: constants_1.visibility_status.LIVE
    });
});
exports.getBlogBySlug = getBlogBySlug;
const updateBlogById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
});
exports.updateBlogById = updateBlogById;
const deleteBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.deleteOne({ _id: id });
});
exports.deleteBlogById = deleteBlogById;
const getUserBlogs = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.find({ user }).sort({ createdAt: -1 });
});
exports.getUserBlogs = getUserBlogs;
// ---------------//
// BLOG CATEGORY 
// ---------------//
const saveCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield blog_category_model_1.default.create(payload);
    return response;
});
exports.saveCategory = saveCategory;
const updateCategoryById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let x = yield blog_category_model_1.default.findOne({ _id: id });
    return yield blog_category_model_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
});
exports.updateCategoryById = updateCategoryById;
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_category_model_1.default.find();
});
exports.getCategories = getCategories;
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_category_model_1.default.deleteOne({ _id: id });
});
exports.deleteCategoryById = deleteCategoryById;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_category_model_1.default.findOne({ _id: id });
});
exports.getCategoryById = getCategoryById;
