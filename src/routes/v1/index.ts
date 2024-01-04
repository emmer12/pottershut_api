import config from "../../config/config";
import authRoute from "./auth.route";
import storeRoute from "./store.route";
import blogRoute from "./blog.route";
import productRoute from "./product.route";
import tripRoute from "./trip.route";
import mediaRoute from "./media.route";
import globalRoute from "./global.route";


const express = require("express");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  },
  {
    path: "/store",
    route: storeRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/trip",
    route: tripRoute,
  },
  {
    path: "/media",
    route: mediaRoute,
  },
  {
    path: "/global",
    route: globalRoute,
  },
];

const devRoutes = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route: any) => {
    router.use(route.path, route.route);
  });
}

export default router;
