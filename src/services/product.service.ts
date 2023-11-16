import Product, { IProduct } from "../models/product.model";
import ProductCategory, { IPCategory } from "../models/product.category.model";
import { visibility_status } from "../config/constants";

const saveProduct = async (payload: IProduct, user_id: string, store_id: string) => {
  payload.user = user_id;
  payload.store = store_id;

  const response = await Product.create(payload);
  return response[0];
};

const getProductById = async (id: string) => {
  return await Product.findById(id);
};

const getProductBySlug = async (slug: string) => {
  return await Product.findOne({
    slug: slug,
    visibility_status: visibility_status.LIVE
  });
};


const updateProductById = async (id: string, data: any) => {
  return await Product.findOneAndUpdate({ _id: id }, data, { new: true });
};

const deleteProductById = async (id: string) => {
  return await Product.deleteOne({ _id: id });
};

const getUserProducts = async (user: string) => {
  return await Product.find({ user }).sort({ createdAt: -1 });
};


// ---------------//
// Product CATEGORY 
// ---------------//

const saveCategory = async (payload: IPCategory) => {
  const response = await ProductCategory.create(payload);
  return response;
};

const updateCategoryById = async (id: string, data: IPCategory) => {
  let x = await ProductCategory.findOne({ _id: id });

  return await ProductCategory.findOneAndUpdate({ _id: id }, data, { new: true });
};


const getCategories = async () => {
  return await ProductCategory.find();
};

const deleteCategoryById = async (id: string) => {
  return await ProductCategory.deleteOne({ _id: id });
};

const getCategoryById = async (id: string) => {
  return await ProductCategory.findOne({ _id: id });
};

export {
  saveProduct,
  getProductById,
  getProductBySlug,
  deleteProductById,
  updateProductById,
  getUserProducts,
  saveCategory,
  updateCategoryById,
  getCategories,
  deleteCategoryById,
  getCategoryById
};
