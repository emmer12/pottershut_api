import express from "express";
import {
  createTrip,
} from "../../controllers/trip.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import * as tripValidations from "../../validations/trip.validation";
const blogRoute = express.Router();


// blogRoute.get(
//   "/",
//   getBlogFeed
// );

// blogRoute.get(
//   "/admin",
//   [auth("admin")],
//   getAll
// );

blogRoute.post(
  "/",
  [auth("admin"), validate(tripValidations.createTrip)],
  createTrip
);

// blogRoute.post(
//   "/upload",
//   [auth("admin")],
//   upload
// );

// blogRoute.patch(
//   "/:id",
//   [auth("admin"), validate(blogValidations.createBlog)],
//   updateBlog
// );

// blogRoute.delete(
//   "/:id",
//   [auth("admin")],
//   deleteBlog
// );

// blogRoute.get(
//   "/category",
//   [auth("admin")],
//   getAllCategories
// );

// blogRoute.post(
//   "/category",
//   [auth("admin"), validate(blogValidations.createBlogCategory)],
//   createCategory
// );

// blogRoute.patch(
//   "/category/:id",
//   [auth("admin"), validate(blogValidations.createBlogCategory)],
//   updateCategory
// );


// blogRoute.delete(
//   "/category/:id",
//   [auth("admin")],
//   deleteCategory
// );


// blogRoute.get(
//   "/:slug",
//   getBlogSlug
// );

// blogRoute.get(
//   "/id/:id",
//   [auth("admin")],
//   getBlogId
// );






export default blogRoute;
