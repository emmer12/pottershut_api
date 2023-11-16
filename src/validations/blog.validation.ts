import * as Joi from "joi";


const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    category: Joi.string().required(),
    body: Joi.string().required(),
    visibility_status: Joi.string().required(),
    tags: Joi.array().empty(),
    preview: Joi.string(),
  }),
};


const createBlogCategory = {
  body: Joi.object().keys({
    body: Joi.string().required(),
  }),
};


export { createBlog, createBlogCategory };
