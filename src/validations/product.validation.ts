import * as Joi from "joi";
import { visibility_status } from "../config/constants";


const createProduct = {
    body: Joi.object().keys({
        title: Joi.string().max(70).required(),
        description: Joi.string().min(10).max(1000).required(),
        category: Joi.string().required(),
        images: Joi.array().min(1).required(),
        price: Joi.number().positive().required(),
        visibility_status: Joi.string().valid(...Object.values(visibility_status)),
        product_type: Joi.string(),
        tags: Joi.array(),
        meta_title: Joi.string(),
        meta_description: Joi.string(),
        height: Joi.number(),
        width: Joi.number(),
        weight: Joi.number(),
        length: Joi.number(),
        listing_type: Joi.string(),
        group_price: Joi.number(),
        booking_required: Joi.number(),
    }),
};
const updateProduct = {
    body: createProduct.body,
    params: Joi.object().keys({
        id: Joi.string().required()
    })
}


const createProductCategory = {
    body: Joi.object().keys({
        body: Joi.string().hex().length(24),
    }),
};


export { createProduct, updateProduct, createProductCategory };
