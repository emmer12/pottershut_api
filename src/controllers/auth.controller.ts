import * as httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import {
  createUser,
  resendOtp,
  getUserByEmail,
  verifyAccount,
} from "../services/user.service";
import { generateAuthTokens, removeToken } from "../services/token.service";
import { generateOtp } from "../services/otp.service";
import { sendOtp } from "../services/mail.service";
import { getUserKyc } from "../services/kyc.service";
const passport = require("passport");

const register = catchAsync(async (req, res) => {
  const user = await createUser(req.body);
  const { otp, verification_key } = await generateOtp(user);

  sendOtp(otp, user.email);

  res
    .status(httpStatus.OK)
    .send({ message: "user created successfully", verification_key });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: "Invalid credentials",
    });
  }

  if (req.params.isAdmin) {
    if (!['admin', 'vendor'].includes(user.role)) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: "Unauthorized",
      });
    }
  }



  if (!user.account_verification) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: "This account has not been verified",
    });
  }

  const isPasswordMatch = await user.isPasswordMatch(password);
  if (!isPasswordMatch) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: "Invalid credentials",
    });
  }

  const token = await generateAuthTokens(user);
  res.status(httpStatus.OK).send({ message: "login successful", user, token });
});



const googleAuth = catchAsync(async (req, res) => {
  const user = req.user;
  const token = await generateAuthTokens(user);
  res.status(httpStatus.OK).send({ message: "login successful", user, token });
});

const logout = catchAsync(async (req, res) => {
  const user = req.user;
  await removeToken(user);
  res.status(httpStatus.OK).send({
    message: "logout successful",
    status: true,
  });
});

const verify = catchAsync(async (req, res) => {
  await verifyAccount(req.body);
  res.status(httpStatus.OK).send({
    message: "Otp Verified",
    status: true,
  });
});

const resend = catchAsync(async (req, res) => {
  const user = await resendOtp(req.body);
  const { otp, verification_key } = await generateOtp(user);
  console.log(otp);

  res.status(httpStatus.OK).send({ message: "Otp resent", verification_key });
});

const currentUser = catchAsync(async (req, res) => {
  const kyc = await getUserKyc(req.user);

  res.status(httpStatus.OK).send({ user: req.user, kyc });
});

export { register, login, logout, verify, resend, currentUser, googleAuth };
