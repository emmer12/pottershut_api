import * as Joi from "joi";


const createOrder = {
    body: Joi.object().keys({
        full_name: Joi.string().required(),
        country: Joi.string().required(),
        phone: Joi.string().required(),
        city: Joi.string().required(),
        email: Joi.string().required().email(),
        address: Joi.string().required(),
        items: Joi.array().items(Joi.object({
            product_id: Joi.string().required(),
            title: Joi.string(),
            price: Joi.required(),
            qty: Joi.required(),

        })).min(1),

    }),
};
const updateOrder = {
    body: createOrder.body,
    params: Joi.object().keys({
        id: Joi.string().required()
    })
}



export { createOrder, updateOrder };
