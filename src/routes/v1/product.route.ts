import express from "express";
import {
  getProductFeed,
  createProduct,
  updateProduct,
  getProductId,
  uploadMedia,
  uploadCategoryMedia,
  getVendorProducts,
  getAllCategories,
  getProductSlug,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../controllers/product.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import * as productValidations from "../../validations/product.validation";
import { changeStatus, deleteStatus } from "../../controllers/admin.product.controller";
import { deleteProductById } from "../../services/product.service";
import * as sharedValidations from "../../validations/shared.validate";
const productRoute = express.Router();


productRoute.get(
  "/",
  getProductFeed
);


productRoute.post(
  "/",
  [auth("create-product"), validate(productValidations.createProduct)],
  createProduct
);


productRoute.post(
  "/media",
  [auth()],
  uploadMedia
);

productRoute.post(
  "/category/media",
  [auth()],
  uploadCategoryMedia
);



productRoute.get(
  "/categories",
  getAllCategories
);

productRoute.post(
  "/category",
  [auth("admin")],
  createCategory
);

productRoute.patch(
  "/category/:id",
  [auth("admin")],
  updateCategory
);
productRoute.delete(
  "/category/:id",
  [auth("admin")],
  deleteCategory
);


// Admin route

productRoute.get(
  "/admin",
  [auth()],
  getVendorProducts
);

productRoute.patch(
  "/admin/:id",
  [auth("change-product-status"), validate(sharedValidations.updateApprovalStatus)],
  changeStatus
);

productRoute.delete(
  "/admin/:id",
  [auth("delete-product")],
  deleteStatus
);


productRoute.get(
  "/:slug",
  getProductSlug
);


productRoute.patch(
  "/admin/:id",
  [auth("update-product"), validate(productValidations.updateProduct)],
  updateProduct
);

productRoute.get(
  "/admin/:id",
  [auth("edit-product")],
  getProductId
);









// blogRoute.get(
//   "/",
//   getBlogFeed
// );






export default productRoute;
