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
import { approval_status, visibility_status } from "../config/constants";
import { handleSingleImage } from "../services/fileupload.service";
import { saveTrip } from "../services/trip.service";
import { ITrip } from "../models/trip.model";
import Product from "../models/product.model";

const createTrip = catchAsync(async (req, res) => {
    const {
        user,
        body,
    }: { user: IUser; body: any } = req;

    await saveTrip(body, user._id);
    res.status(httpStatus.OK).send({ message: "created successfully" });
});


export {
    createTrip,

};
