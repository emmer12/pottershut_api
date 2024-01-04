import express from "express";
import {
  getProductFeed,
  createProduct,
  updateProduct,
  getProductId,
  uploadMedia,
  getVendorProducts,
  getAllCategories
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


productRoute.get(
  "/categories",
  getAllCategories
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




productRoute.patch(
  "/:id",
  [auth("update-product"), validate(productValidations.updateProduct)],
  updateProduct
);

productRoute.get(
  "/:id",
  [auth("edit-product")],
  getProductId
);






// blogRoute.get(
//   "/",
//   getBlogFeed
// );






export default productRoute;
