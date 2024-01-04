import express from "express";
import {
  createStore,
  getStore
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

storeRoute.get(
  "/admin",
  [
    auth(),
  ],
  getStore
);






export default storeRoute;
