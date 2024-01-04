import express from "express";
import {
    getHomePageData,
} from "../../controllers/global.controller";
import auth from "../../middlewares/auth";
const globalRoute = express.Router();

globalRoute.get(
    "/home-page-data",
    getHomePageData
);


export default globalRoute;
