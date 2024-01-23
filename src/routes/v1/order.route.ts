import { createOrder } from "../../controllers/order.controller";
import validate from "../../middlewares/validate";
const express = require("express");
const orderValidation = require("../../validations/order.validation");
const orderRoute = express.Router();
import auth from "../../middlewares/auth";


orderRoute.post("/", [auth()], validate(orderValidation.createOrder), createOrder);


export default orderRoute;
