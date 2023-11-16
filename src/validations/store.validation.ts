import * as Joi from "joi";
import { visibility_status } from "../config/constants";


const createStore = {
    body: Joi.object().keys({
        store_name: Joi.string().required(),
        store_email: Joi.string().email(),
        store_phone: Joi.string(),
        store_address: Joi.string(),
        logo: Joi.string(),
        store_phone_ext: Joi.string(),
        tags: Joi.array(),
        preview: Joi.string(),
        visibility_status: Joi.string().valid(...Object.values(visibility_status)),
    }),
};




export { createStore };
