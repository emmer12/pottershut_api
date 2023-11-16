import * as httpStatus from "http-status";
import { IUser } from "../models/user.model";
import {
  saveUserGeo,
  getGeoByField,
  updateGeoById,
} from "../services/kyc.service";
import catchAsync from "../utils/catchAsync";
import { IGeo } from "../models/user_geo.model";

const createGeoUser = catchAsync(async (req, res) => {
  const { user, body }: { user: IUser; body: IGeo } = req;

  const savePayload: IGeo = {
    city: body.city,
    state: body.state,
    country: body.country,
    home_address_1: body.home_address_1,
    home_address_2: body.home_address_2,
    office_address_1: body.office_address_1,
    office_address_2: body.office_address_2,
    ip: body.ip,
    long: body.long,
    lat: body.lat,
    user: user.id,
    zip: body.zip,
  };

  const uid = await getGeoByField({ user: user.id });

  if (uid) {
    await updateGeoById(uid._id.toString(), savePayload);
  } else {
    await saveUserGeo(savePayload);
  }

  res
    .status(httpStatus.OK)
    .send({ message: "basic information submitted successfully" });
});

export { createGeoUser };
