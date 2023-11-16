import mongoose from "mongoose";
import UserBasic, { IUserBasic } from "../models/user_basic.model";
import UserId, { IId } from "../models/user_id.model";
import UserGeo, { IGeo } from "../models/user_geo.model";
import UserKyc from "../models/user_kyc";
import User, { IUser } from "../models/user.model";
import UserSub from "../models/user_kyc_sub";
import { kycPricing, payment_status, sub_type } from "../config/constants";
import { generateCode } from "../utils";

const saveBasicUser = async (payload: IUserBasic) => {
  //   Validate User Information
  const response = await UserBasic.create(payload);
  return response;
};

const updateBasicById = async (id: string, data: any) => {
  return await UserBasic.findOneAndUpdate({ _id: id }, data, { new: true });
};

const getBasicById = async (id: string) => {
  return await UserBasic.findById(id);
};

const getBasicByField = async (fields: any) => {
  return await UserBasic.findOne(fields);
};

// Id Verification

const saveUserId = async (payload: IId) => {
  const response = await UserId.create(payload);
  return response;
};

const getIdByField = async (fields: any) => {
  return await UserId.findOne(fields);
};

const getUidById = async (id: string) => {
  return await UserId.findById(id);
};

const updateIdsById = async (id: string, data: any) => {
  return await UserId.findOneAndUpdate({ _id: id }, data, { new: true });
};

// Geo Validation

const saveUserGeo = async (payload: IGeo) => {
  const response = await UserGeo.create(payload);
  return response;
};

const getGeoByField = async (fields: any) => {
  return await UserGeo.findOne(fields);
};

const getUGeoById = async (id: string) => {
  return await UserGeo.findById(id);
};

const updateGeoById = async (id: string, data: any) => {
  return await UserGeo.findOneAndUpdate({ _id: id }, data, { new: true });
};
const getKyc = async (id: string) => {
  return await UserKyc.findOne({ user: id });
};

const createKyc = async (user: IUser) => {
  const sub = await UserSub.findOne({
    user: user.id,
    payment_status: payment_status.PAID,
  });

  if (!sub) throw new Error("Subscription not found");

  const code = generateCode(10);

  const response = await UserKyc.create({
    kyc_code: code,
    sub_id: sub.id,
    sub_type: sub.sub_type,
    user: user.id,
  });
  return response;
};

const createKycByCode = async (user: IUser, kyc_code: string) => {
  const kyc = await UserKyc.findOne({
    kyc_code,
  });

  if (!kyc) throw new Error("Kyc with this code not found");
  if (kyc.count >= kycPricing.PRO.LIMIT) throw new Error("Kyc limit reached");
  if (kyc.sub_type == sub_type.INDIVIDUAL)
    throw new Error("Code not supported by your current subscription type.");

  // TODO Send email to the root subscriber

  const code = generateCode(18);

  const response = await UserKyc.create({
    kyc_code: code,
    sub_id: kyc.sub_id,
    sub_type: sub_type.INDIVIDUAL,
    user: user.id,
  });

  await User.findOneAndUpdate(
    { _id: user.id },
    {
      kyc_enabled: true,
    }
  );

  await UserKyc.findOneAndUpdate(
    { kyc_code: kyc_code },
    { $inc: { count: 1 } }
  );
  return response;
};

const createSub = async (user: IUser, data: any) => {
  const sub = await UserSub.findOne({
    user: user.id,
    payment_status: payment_status.PAID,
  });

  const amount =
    data.sub == "regular" ? kycPricing.BASIC.PRICE : kycPricing.PRO.PRICE;

  if (sub) throw new Error("You have already subscribe");

  const code = generateCode(8);

  const response = await UserSub.create({
    amount,
    payment_status: payment_status.PAID,
    reference: code,
    sub_type: sub_type.INDIVIDUAL,
    user: user.id,
    hash: data.hash,
    chain: data.chain,
  });

  await User.findOneAndUpdate(
    { _id: user.id },
    {
      kyc_enabled: true,
    }
  );

  return response;
};

const getUserKyc = async (user: any) => {
  return await UserKyc.find({ user: user.id });
};

export {
  saveBasicUser,
  updateBasicById,
  getBasicById,
  getBasicByField,
  saveUserId,
  getIdByField,
  getUidById,
  updateIdsById,
  saveUserGeo,
  getGeoByField,
  getUGeoById,
  updateGeoById,
  getKyc,
  createKyc,
  getUserKyc,
  createKycByCode,
  createSub,
};
