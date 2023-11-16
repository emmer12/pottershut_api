import * as Joi from "joi";

const createImage = {
    body: Joi.object().keys({
        // headers: Joi.object({
        //     'content-disposition': Joi.string().required(),
        //     'content-type': Joi.string().valid(['image/jpeg']).required(),
        // }).required(),
    }),
};

const createImages = {
    body: Joi.object().keys({
        // headers: Joi.object({
        //     'content-disposition': Joi.string().required(),
        //     'content-type': Joi.string().valid(['image/jpeg']).required(),
        // }).required(),
    }),
};

export { createImage, createImages };