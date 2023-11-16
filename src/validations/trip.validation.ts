import * as Joi from "joi";
import { visibility_status } from "../config/constants";


const createTrip = {
    body: Joi.object().keys({
        title: Joi.string().max(70).required(),
        description: Joi.string().min(50).max(1000).required(),
        additional_information: Joi.string().max(200).required(),
        images: Joi.array().min(1).required(),
        price: Joi.number().positive().required(),
        visibility_status: Joi.string().valid(...Object.values(visibility_status)),
        inclusion: Joi.array(),
        exclusion: Joi.array(),
        meta_title: Joi.string(),
        meta_description: Joi.string(),
    }),
};

const updateTrip = {
    body: createTrip.body,
    params: Joi.object().keys({
        id: Joi.string().required()
    })
}

export { createTrip, updateTrip };
