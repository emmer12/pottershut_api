import express from "express";
import {
  createStore,
} from "../../controllers/store.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import * as storeValidations from "../../validations/store.validation";
const storeRoute = express.Router();


storeRoute.post(
  "/",
  [
    auth(),
    validate(storeValidations.createStore),
  ],
  createStore
);





export default storeRoute;
