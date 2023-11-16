import express from "express";
import {
    uploadMultipleMedia, uploadSingleMedia,
} from "../../controllers/media.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import * as mediaValidator from "../../validations/media.validation";

const mediaRoute = express.Router();

mediaRoute.post(
    "/single",
    [auth()],
    uploadSingleMedia
);


mediaRoute.post(
    "/multiple",
    [auth()],
    uploadMultipleMedia
);



export default mediaRoute;
