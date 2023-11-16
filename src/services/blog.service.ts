import mongoose from "mongoose";
import Like from "../models/like.model";
import Blog, { IBlog } from "../models/blog.model";
import BlogCategory, { ICategory } from "../models/blog.category.model";
import { visibility_status } from "../config/constants";

const saveBlog = async (payload: IBlog, user) => {
  payload.user = user._id;

  const response = await Blog.create(payload);
  return response[0];
};

const getBlogById = async (id: string) => {
  return await Blog.findById(id);
};

const getBlogBySlug = async (slug: string) => {
  return await Blog.findOne({
    slug: slug,
    visibility_status: visibility_status.LIVE
  });
};


const updateBlogById = async (id: string, data: any) => {
  return await Blog.findOneAndUpdate({ _id: id }, data, { new: true });
};

const deleteBlogById = async (id: string) => {
  return await Blog.deleteOne({ _id: id });
};

const getUserBlogs = async (user: string) => {
  return await Blog.find({ user }).sort({ createdAt: -1 });
};


// ---------------//
// BLOG CATEGORY 
// ---------------//

const saveCategory = async (payload: ICategory) => {
  const response = await BlogCategory.create(payload);
  return response;
};

const updateCategoryById = async (id: string, data: ICategory) => {
  let x = await BlogCategory.findOne({ _id: id });

  return await BlogCategory.findOneAndUpdate({ _id: id }, data, { new: true });
};


const getCategories = async () => {
  return await BlogCategory.find();
};

const deleteCategoryById = async (id: string) => {
  return await BlogCategory.deleteOne({ _id: id });
};

const getCategoryById = async (id: string) => {
  return await BlogCategory.findOne({ _id: id });
};

export {
  saveBlog,
  getBlogById,
  getBlogBySlug,
  deleteBlogById,
  updateBlogById,
  getUserBlogs,
  saveCategory,
  updateCategoryById,
  getCategories,
  deleteCategoryById,
  getCategoryById
};
