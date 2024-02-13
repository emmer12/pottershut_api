import * as Joi from "joi";
import { visibility_status } from "../config/constants";

const createStore = {
    body: Joi.object().keys({
        store_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        first_name: Joi.any().when('guest_type', { is: 'guest', then: Joi.string().required(), otherwise: Joi.optional() }),
        last_name: Joi.any().when('guest_type', { is: 'guest', then: Joi.string().required(), otherwise: Joi.optional() }),
        guest_type: Joi.string()
    }),
};


export { createStore };
