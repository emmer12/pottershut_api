import * as httpStatus from "http-status";
import UserBasic, { IUserBasic } from "../models/user_basic.model";
import { IUser } from "../models/user.model";
import {
  saveBasicUser,
  updateBasicById,
  getBasicById,
  getBasicByField,
  getKyc,
  createKyc,
  createKycByCode,
  createSub,
} from "../services/kyc.service";
import catchAsync from "../utils/catchAsync";
import { sendKycNotification } from "../services/mail.service";
import { generateCert } from "../services/pdf.service";
import fs from "fs";
import path from "path";

const createBasicUser = catchAsync(async (req, res) => {
  const { user, body }: { user: IUser; body: IUserBasic } = req;

  const savePayload = {
    first_name: body.first_name,
    last_name: body.last_name,
    middle_name: body.middle_name,
    state: body.state,
    marital_status: body.marital_status,
    phone: body.phone,
    socials: JSON.parse(body.socials as any),
    disability: body.disability,
    nationality: body.nationality,
    religion: body.religion,
    dob: body.dob,
    user: user.id,
    email: user.email,
  };

  const basic = await getBasicByField({ user: user.id });

  if (basic) {
    await updateBasicById(basic._id.toString(), savePayload);
  } else {
    await saveBasicUser(savePayload);
  }

  res
    .status(httpStatus.OK)
    .send({ message: "basic information submitted successfully" });
});

const updateTweet = catchAsync(async (req, res) => {
  const basicId = req.params.id;

  const data = req.body;

  const user = req.user;

  if (!basicId) {
    res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "User basic id is required" });
  }

  const basic = await getBasicById(basicId);

  if (!basic) {
    res.status(httpStatus.NOT_FOUND).send({ message: "Basic User not found" });
  } else {
    if (basic.user.toString() !== user._id.toString()) {
      res.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorized" });
    } else {
      await updateBasicById(basicId, data);
      res
        .status(httpStatus.OK)
        .send({ message: "Basic User updated successfully" });
    }
  }
});

const getBasicUser = catchAsync(async (req, res) => {
  const { user }: { user: IUser } = req;
  console.log(user);
  const basic = await getBasicByField({ user: user.id });

  res.status(httpStatus.OK).send({ basic });
});

const processCallback = async (req, res) => {
  console.log(req, "Got here");
  sendKycNotification();
  res.status(httpStatus.OK).send({});
};

const generatePdf = catchAsync(async (req, res) => {
  if (!req.user.is_verified)
    throw new Error("Account not verified. Please complete your kyc");

  const user = await UserBasic.findOne({ user: req.user.id });

  const now = Date.now().toString();

  const data = {
    name: `${user.first_name} ${user.middle_name} ${user.last_name}`,
    email: req.user.email,
    path: `public/certificates/${user.first_name}-${user.middle_name}-${now}.pdf`,
  };

  await generateCert(data, res);
});

const startKyc = catchAsync(async (req, res) => {
  const { user }: { user: IUser } = req;

  const kyc = await getKyc(user.id);

  if (kyc) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "You have Already Started Kyc" });
  }

  const k = await createKyc(user);

  res.status(httpStatus.OK).send({ kyc: k });
});

const createKycCode = catchAsync(async (req, res) => {
  const { user }: { user: IUser } = req;

  const kyc = await getKyc(user.id);

  if (kyc) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "You have Already Started Kyc" });
  }

  const k = await createKycByCode(user, req.body.code);

  res.status(httpStatus.OK).send({ kyc: k });
});

const createKycSub = catchAsync(async (req, res) => {
  const { user }: { user: IUser } = req;
  const data = req.body;

  const sub = await createSub(user, data);

  res.status(httpStatus.OK).send({ sub });
});

export {
  createBasicUser,
  updateBasicById,
  getBasicUser,
  processCallback,
  generatePdf,
  startKyc,
  createKycCode,
  createKycSub,
};
