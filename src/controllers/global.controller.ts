import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import Product from "../models/product.model";
import { limits, visibility_status } from "../config/constants";

const getHomePageData = catchAsync(async (req, res) => {

    const products = await Product.find({
        visibility_status: visibility_status.LIVE,
    }).limit(limits.SLIDER)

    const featured_products = await Product.find({
        visibility_status: visibility_status.LIVE,
        is_featured: true,
        is_pad: false

    }).limit(limits.SLIDER)


    const featured_weavepad = await Product.find({
        visibility_status: visibility_status.LIVE,
        // is_featured: true,
        is_pad: true
    }).limit(limits.SLIDER)

    res.status(httpStatus.OK).send({
        products,
        featured_products,
        featured_weavepad
    });
});



export {
    getHomePageData,
};
