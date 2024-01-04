import * as httpStatus from "http-status";
import { IUser } from "../models/user.model";
import {
  saveBlog,
  getBlogById,
  deleteBlogById,
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
import { approval_status, limits, visibility_status } from "../config/constants";
import { handleMultipleFile, handleSingleImage } from "../services/fileupload.service";
import { saveProduct, getProductBySlug, getProductById, updateProductById } from "../services/product.service";
import { getStore } from "../services/store.service";
import { IStore } from "../models/store.model";
import Product from "../models/product.model";

const createProduct = catchAsync(async (req, res) => {
  const {
    user,
    body,
  }: { user: IUser; body: any } = req;

  const store: IStore = await getStore(user._id);

  if (!store) return res.status(httpStatus.NOT_FOUND).send({ message: "Store not found" });
  if (store.approval_status !== approval_status.APPROVED) return res.status(httpStatus.NOT_FOUND).send({ message: "Store has as not yet been approved" });

  await saveProduct(body, user._id, store._id);

  res.status(httpStatus.OK).send({ message: "created successfully" });
});

const getBlog = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: "success" });
});



const getProductSlug = catchAsync(async (req, res) => {
  const slug = req.params.slug;

  const product = await getProductBySlug(slug);
  if (!product) {
    return res.status(httpStatus.NOT_FOUND).send({ message: "Not Found" });
  }
  res.status(httpStatus.OK).send({ product, message: "success" });
});

const getProductId = catchAsync(async (req, res) => {
  const id = req.params.id;

  const product = await getProductById(id);
  if (!product) {
    return res.status(httpStatus.NOT_FOUND).send({ message: "Not Found" });
  }
  res.status(httpStatus.OK).send({ product, message: "success" });
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

const updateProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;

  const data = req.body;
  const user = req.user;

  if (!productId) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "Product id is required" });
  }

  const product = await getProductById(productId);

  if (!product) {
    res.status(httpStatus.NOT_FOUND).send({ message: "Product not found" });
  } else {
    if (product.user.toString() !== user._id.toString()) {
      res.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorized" });
    } else {
      await updateProductById(productId, data);
      res.status(httpStatus.OK).send({ message: "Product updated successfully" });
    }
  }
});



const getProductFeed = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || limits.APP;
  const skip = (page - 1) * limit;

  const match: any = {}

  if (req.query.category) {
    match.category = req.query.category
  }


  const products = await Product.find({
    visibility_status: visibility_status.LIVE,
    ...match
  }).limit(limit).skip(skip).sort({ createdAt: -1 }).populate('category')

  const total = await Product.countDocuments({
    visibility_status: visibility_status.LIVE,
    ...match
  });

  res.status(httpStatus.OK).send({ data: products, total, page });
});


const getVendorProducts = catchAsync(async (req, res) => {
  const { role, id } = req.user
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const match: any = {}

  if (req.query.category) {
    match.category = req.query.category
  }


  if (role == "vendor") {
    match.user = id
  }

  const products = await Product.find({
    ...match
  }).limit(limit).skip(skip).sort({ createdAt: -1 }).populate('category')


  const total = await Product.countDocuments({
    ...match
  });

  res.status(httpStatus.OK).send({ data: products, total, page });
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


const uploadMedia = catchAsync(async (req, res) => {
  const { body: data }: { body: ICategory } = req;

  const media = await handleMultipleFile(req, true, 'products').catch((err) => {
    res.status(httpStatus.UNSUPPORTED_MEDIA_TYPE).send({ message: err });
  })

  res.status(httpStatus.OK).send({ media });
});



export {
  createProduct,
  getProductSlug,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductFeed,
  getProductId,
  updateProduct,
  deleteBlog,
  upload,
  uploadMedia,
  getVendorProducts
};
