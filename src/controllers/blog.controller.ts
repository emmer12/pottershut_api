import * as httpStatus from "http-status";
import { IUser } from "../models/user.model";
import {
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
} from "../services/blog.service";
import catchAsync from "../utils/catchAsync";
import Blog from "../models/blog.model";
import { ICategory } from "../models/blog.category.model";
import { visibility_status } from "../config/constants";
import { handleSingleImage } from "../services/fileupload.service";

const createBlog = catchAsync(async (req, res) => {
  const {
    user,
    body,
  }: { user: IUser; body: any } = req;

  await saveBlog(body, user);

  res.status(httpStatus.OK).send({ message: "created successfully" });
});

const getBlog = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: "success" });
});



const getBlogSlug = catchAsync(async (req, res) => {
  const slug = req.params.slug;

  const blog = await getBlogBySlug(slug);
  if (!blog) {
    return res.status(httpStatus.NOT_FOUND).send({ message: "Not Found" });
  }
  res.status(httpStatus.OK).send({ blog, message: "success" });
});

const getBlogId = catchAsync(async (req, res) => {
  const id = req.params.id;

  const blog = await getBlogById(id);
  if (!blog) {
    return res.status(httpStatus.NOT_FOUND).send({ message: "Not Found" });
  }
  res.status(httpStatus.OK).send({ blog, message: "success" });
});

const getUserBlog = catchAsync(async (req, res) => {
  const user = req.user;
  const tweets = await getUserBlogs(user._id);
  res.status(httpStatus.OK).send({ message: "success", tweets });
});

const deleteBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;

  const user = req.user;

  if (!blogId) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "blog id is required" });
  }

  const blog = await getBlogById(blogId);

  if (!blog) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Blog not found" });
  } else {
    if (blog.user.toString() !== user._id.toString()) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ message: "Unauthorized" });
    } else {
      await deleteBlogById(blogId);
      return res
        .status(httpStatus.OK)
        .send({ message: "Blog deleted successfully" });
    }
  }
});

const updateBlog = catchAsync(async (req, res) => {
  const blogId = req.params.id;

  const data = req.body;
  const user = req.user;

  if (!blogId) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "blog id is required" });
  }

  const blog = await getBlogById(blogId);

  if (!blog) {
    res.status(httpStatus.NOT_FOUND).send({ message: "Blog not found" });
  } else {
    if (blog.user.toString() !== user._id.toString()) {
      res.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorized" });
    } else {
      await updateBlogById(blogId, data);
      res.status(httpStatus.OK).send({ message: "Blog updated successfully" });
    }
  }
});



const getBlogFeed = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const match: any = {}

  if (req.query.category) {
    match.category = req.query.category
  }

  console.log(match)


  const blog = await Blog.find({
    visibility_status: visibility_status.LIVE,
    ...match
  }).limit(limit).skip(skip).sort({ createdAt: -1 }).populate('category')


  const total = await Blog.countDocuments({
    visibility_status: visibility_status.LIVE,
    ...match
  });

  res.status(httpStatus.OK).send({ data: blog, total, page });
});



const getAll = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const match: any = {}

  if (req.query.category) {
    match.category = req.query.category
  }


  const blog = await Blog.find({
    ...match
  }).limit(limit).skip(skip).sort({ createdAt: -1 })


  const total = await Blog.countDocuments({
    ...match
  });

  res.status(httpStatus.OK).send({ data: blog, total, page });
});



// ---------------//
// BLOG CATEGORY 
// ---------------//


// Create

const createCategory = catchAsync(async (req, res) => {
  const { body }: { body: ICategory } = req;

  await saveCategory(body);

  res.status(httpStatus.OK).send({ message: "created successfully" });
});


const updateCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.id;
  const { body: data }: { body: ICategory } = req;

  await updateCategoryById(categoryId, data);

  res.status(httpStatus.OK).send({ message: "updated successfully" });
});



const getAllCategories = catchAsync(async (req, res) => {
  const categories = await getCategories();
  res.status(httpStatus.OK).send({ categories, message: "created successfully" });
});


const deleteCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.id;

  const user = req.user;

  if (!categoryId) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "category id is required" });
  }

  const category = await getCategoryById(categoryId);

  if (!category) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ message: "Category not found" });
  } else {
    await deleteCategoryById(categoryId);
    return res
      .status(httpStatus.OK)
      .send({ message: "Category deleted successfully" });
  }
});

const upload = catchAsync(async (req, res) => {
  const { file_path } = await handleSingleImage(req, true);

  return res
    .status(httpStatus.OK)
    .send({ message: "category id is required", path: file_path });
});


export {
  createBlog,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getBlogFeed,
  getBlogSlug,
  getBlogId,
  updateBlog,
  deleteBlog,
  getAll,
  upload
};
