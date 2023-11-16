import express from "express";
import {
  createProduct,
  updateProduct,
  getProductId,
  uploadMedia
} from "../../controllers/product.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import * as productValidations from "../../validations/product.validation";
import { changeStatus, deleteStatus } from "../../controllers/admin.product.controller";
import { deleteProductById } from "../../services/product.service";
import * as sharedValidations from "../../validations/shared.validate";
const productRoute = express.Router();


// blogRoute.get(
//   "/",
//   getBlogFeed
// );


productRoute.post(
  "/",
  [auth("create-product"), validate(productValidations.createProduct)],
  createProduct
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

productRoute.post(
  "/media",
  [auth()],
  uploadMedia
);


// Admin route

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





export default productRoute;
