import express from "express";
import {
  createBasicUser,
  updateBasicById,
  getBasicUser,
  processCallback,
  generatePdf,
  startKyc,
  createKycCode,
  createKycSub,
} from "../../controllers/user_basic.controller";

import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import * as kycUserValidations from "../../validations/kyc_user.validation";
import { createIdUser } from "../../controllers/user_id.controller";
import { createGeoUser } from "../../controllers/user_geo.controller";
const kycRoute = express.Router();

// Basic

kycRoute.get("/", (req, res) => {
  res.send("VetMe Kyc Api Endpoint");
});

kycRoute.get("/basic", [auth("kyc")], getBasicUser);
kycRoute.post("/start", [auth("kyc")], startKyc);
kycRoute.post("/validate-code", auth(), createKycCode);
kycRoute.post("/shuftipro/callback", [auth("kyc")], processCallback);

kycRoute.post("/create-sub", auth(), createKycSub);

kycRoute.post(
  "/basic/create",
  [auth("kyc"), validate(kycUserValidations.createBasic)],
  createBasicUser
);

kycRoute.patch(
  "/basic/:id",
  [auth("kyc"), validate(kycUserValidations.updateBasic)],
  updateBasicById
);

kycRoute.post(
  "/id/create",
  [auth("kyc"), validate(kycUserValidations.createId)],
  createIdUser
);

kycRoute.post(
  "/geo/create",
  [auth("kyc"), validate(kycUserValidations.createGeo)],
  createGeoUser
);

kycRoute.get("/generate-certificate", [auth("kyc")], generatePdf);

kycRoute.post("/pdf-test", generatePdf);

export default kycRoute;
