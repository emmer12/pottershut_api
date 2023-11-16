import {
  login,
  register,
  logout,
  verify,
  resend,
  currentUser,
  googleAuth,
} from "../../controllers/auth.controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { sendOtp } from "../../services/mail.service";
const express = require("express");
const authValidation = require("../../validations/auth.validation");
const passport = require("passport");
const authRoute = express.Router();

authRoute.post("/register", validate(authValidation.register), register);
authRoute.post("/login/:isAdmin?", validate(authValidation.login), login);
authRoute.post(
  "/google/callback",
  passport.authenticate("google-token", { session: false }),
  googleAuth
);
authRoute.post("/logout", auth("logout"), logout);
authRoute.post("/verify", validate(authValidation.otp), verify);
authRoute.post("/resend", validate(authValidation.resend), resend);
authRoute.get("/user", auth(), currentUser);

authRoute.get("/mail-test", () => sendOtp("1234", "emmer@mail.com"));

export default authRoute;
