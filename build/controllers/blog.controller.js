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
exports.upload = exports.getAll = exports.deleteBlog = exports.updateBlog = exports.getBlogId = exports.getBlogSlug = exports.getBlogFeed = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getAllCategories = exports.createBlog = void 0;
const httpStatus = __importStar(require("http-status"));
const blog_service_1 = require("../services/blog.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const blog_model_1 = __importDefault(require("../models/blog.model"));
const constants_1 = require("../config/constants");
const fileupload_service_1 = require("../services/fileupload.service");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, body, } = req;
    yield (0, blog_service_1.saveBlog)(body, user);
    res.status(httpStatus.OK).send({ message: "created successfully" });
}));
exports.createBlog = createBlog;
const getBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(httpStatus.OK).send({ message: "success" });
}));
const getBlogSlug = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const blog = yield (0, blog_service_1.getBlogBySlug)(slug);
    if (!blog) {
        return res.status(httpStatus.NOT_FOUND).send({ message: "Not Found" });
    }
    res.status(httpStatus.OK).send({ blog, message: "success" });
}));
exports.getBlogSlug = getBlogSlug;
const getBlogId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const blog = yield (0, blog_service_1.getBlogById)(id);
    if (!blog) {
        return res.status(httpStatus.NOT_FOUND).send({ message: "Not Found" });
    }
    res.status(httpStatus.OK).send({ blog, message: "success" });
}));
exports.getBlogId = getBlogId;
const getUserBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const tweets = yield (0, blog_service_1.getUserBlogs)(user._id);
    res.status(httpStatus.OK).send({ message: "success", tweets });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const user = req.user;
    if (!blogId) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "blog id is required" });
    }
    const blog = yield (0, blog_service_1.getBlogById)(blogId);
    if (!blog) {
        return res
            .status(httpStatus.NOT_FOUND)
            .send({ message: "Blog not found" });
    }
    else {
        if (blog.user.toString() !== user._id.toString()) {
            return res
                .status(httpStatus.UNAUTHORIZED)
                .send({ message: "Unauthorized" });
        }
        else {
            yield (0, blog_service_1.deleteBlogById)(blogId);
            return res
                .status(httpStatus.OK)
                .send({ message: "Blog deleted successfully" });
        }
    }
}));
exports.deleteBlog = deleteBlog;
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const data = req.body;
    const user = req.user;
    if (!blogId) {
        res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "blog id is required" });
    }
    const blog = yield (0, blog_service_1.getBlogById)(blogId);
    if (!blog) {
        res.status(httpStatus.NOT_FOUND).send({ message: "Blog not found" });
    }
    else {
        if (blog.user.toString() !== user._id.toString()) {
            res.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorized" });
        }
        else {
            yield (0, blog_service_1.updateBlogById)(blogId, data);
            res.status(httpStatus.OK).send({ message: "Blog updated successfully" });
        }
    }
}));
exports.updateBlog = updateBlog;
const getBlogFeed = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const match = {};
    if (req.query.category) {
        match.category = req.query.category;
    }
    console.log(match);
    const blog = yield blog_model_1.default.find(Object.assign({ visibility_status: constants_1.visibility_status.LIVE }, match)).limit(limit).skip(skip).sort({ createdAt: -1 }).populate('category');
    const total = yield blog_model_1.default.countDocuments(Object.assign({ visibility_status: constants_1.visibility_status.LIVE }, match));
    res.status(httpStatus.OK).send({ data: blog, total, page });
}));
exports.getBlogFeed = getBlogFeed;
const getAll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const match = {};
    if (req.query.category) {
        match.category = req.query.category;
    }
    const blog = yield blog_model_1.default.find(Object.assign({}, match)).limit(limit).skip(skip).sort({ createdAt: -1 });
    const total = yield blog_model_1.default.countDocuments(Object.assign({}, match));
    res.status(httpStatus.OK).send({ data: blog, total, page });
}));
exports.getAll = getAll;
// ---------------//
// BLOG CATEGORY 
// ---------------//
// Create
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield (0, blog_service_1.saveCategory)(body);
    res.status(httpStatus.OK).send({ message: "created successfully" });
}));
exports.createCategory = createCategory;
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const { body: data } = req;
    yield (0, blog_service_1.updateCategoryById)(categoryId, data);
    res.status(httpStatus.OK).send({ message: "updated successfully" });
}));
exports.updateCategory = updateCategory;
const getAllCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, blog_service_1.getCategories)();
    res.status(httpStatus.OK).send({ categories, message: "created successfully" });
}));
exports.getAllCategories = getAllCategories;
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    const user = req.user;
    if (!categoryId) {
        return res
            .status(httpStatus.BAD_REQUEST)
            .send({ message: "category id is required" });
    }
    const category = yield (0, blog_service_1.getCategoryById)(categoryId);
    if (!category) {
        return res
            .status(httpStatus.NOT_FOUND)
            .send({ message: "Category not found" });
    }
    else {
        yield (0, blog_service_1.deleteCategoryById)(categoryId);
        return res
            .status(httpStatus.OK)
            .send({ message: "Category deleted successfully" });
    }
}));
exports.deleteCategory = deleteCategory;
const upload = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { file_path } = yield (0, fileupload_service_1.handleSingleImage)(req, true);
    return res
        .status(httpStatus.OK)
        .send({ message: "category id is required", path: file_path });
}));
exports.upload = upload;
