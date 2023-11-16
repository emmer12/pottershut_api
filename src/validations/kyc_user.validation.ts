import * as Joi from "joi";

const createBasic = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    middle_name: Joi.string(),
    state: Joi.string().required(),
    marital_status: Joi.string().required(),
    phone: Joi.string().required(),
    socials: Joi.string().required(),
    disability: Joi.boolean().required(),
    nationality: Joi.string().required(),
    religion: Joi.string().required(),
    dob: Joi.string().required(),
    email: Joi.string().required(),
  }),
};

const updateBasic = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    middle_name: Joi.string(),
    state: Joi.string().required(),
    marital_status: Joi.string().required(),
    phone: Joi.string().required(),
    socials: Joi.string().required(),
    disability: Joi.string().required(),
    nationality: Joi.string().required(),
    religion: Joi.string().required(),
    dob: Joi.string().required(),
    email: Joi.string().required(),
  }),
};

const createId = {
  body: Joi.object().keys({
    id_type: Joi.string().required(),
    expiration_date: Joi.date().required(),
    card_number: Joi.string().required(),
    doc: Joi.string(),
    proof: Joi.string(),
  }),
};

const createGeo = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    home_address_1: Joi.string().required(),
    home_address_2: Joi.string(),
    office_address_1: Joi.string(),
    office_address_2: Joi.string(),
    zip: Joi.number().required(),
    ip: Joi.required(),
    long: Joi.number().required(),
    lat: Joi.number().required(),
  }),
};

export { createBasic, updateBasic, createId, createGeo };
