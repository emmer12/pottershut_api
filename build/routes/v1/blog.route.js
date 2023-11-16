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
const blog_controller_1 = require("../../controllers/blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validate_1 = __importDefault(require("../../middlewares/validate"));
const blogValidations = __importStar(require("../../validations/blog.validation"));
const blogRoute = express_1.default.Router();
blogRoute.get("/", blog_controller_1.getBlogFeed);
blogRoute.get("/admin", [(0, auth_1.default)("admin")], blog_controller_1.getAll);
blogRoute.post("/", [(0, auth_1.default)("admin"), (0, validate_1.default)(blogValidations.createBlog)], blog_controller_1.createBlog);
blogRoute.post("/upload", [(0, auth_1.default)("admin")], blog_controller_1.upload);
blogRoute.patch("/:id", [(0, auth_1.default)("admin"), (0, validate_1.default)(blogValidations.createBlog)], blog_controller_1.updateBlog);
blogRoute.delete("/:id", [(0, auth_1.default)("admin")], blog_controller_1.deleteBlog);
blogRoute.get("/category", [(0, auth_1.default)("admin")], blog_controller_1.getAllCategories);
blogRoute.post("/category", [(0, auth_1.default)("admin"), (0, validate_1.default)(blogValidations.createBlogCategory)], blog_controller_1.createCategory);
blogRoute.patch("/category/:id", [(0, auth_1.default)("admin"), (0, validate_1.default)(blogValidations.createBlogCategory)], blog_controller_1.updateCategory);
blogRoute.delete("/category/:id", [(0, auth_1.default)("admin")], blog_controller_1.deleteCategory);
blogRoute.get("/:slug", blog_controller_1.getBlogSlug);
blogRoute.get("/id/:id", [(0, auth_1.default)("admin")], blog_controller_1.getBlogId);
exports.default = blogRoute;
