import * as httpStatus from "http-status";
import { IUserBasic } from "../models/user_basic.model";
import { IUser } from "../models/user.model";
import {
  getIdByField,
  getUidById,
  saveUserId,
  updateIdsById,
} from "../services/kyc.service";
import catchAsync from "../utils/catchAsync";
import { IId } from "../models/user_id.model";
import formidable from "formidable";
import fs from "fs";
import {
  handleMultipleFile,
  handleSingleFile,
  readFile,
} from "../services/fileupload.service";
import path from "path";

const createIdUser = catchAsync(async (req, res) => {
  const { user, body }: { user: IUser; body: IId } = req;

  // const { file_path } = await handleSingleFile(req, true);
  const files = await handleMultipleFile(req, true);

  const savePayload = {
    id_type: body.id_type,
    expiration_date: body.expiration_date,
    card_number: body.card_number,
    doc_path: files.find((f) => f.field == "doc").file_path || "",
    proof_path: files.find((f) => f.field == "proof").file_path || "",
    user: user.id,
  };

  const uid = await getIdByField({ user: user.id });

  if (uid) {
    await updateIdsById(uid._id.toString(), savePayload);
  } else {
    await saveUserId(savePayload);
  }

  res
    .status(httpStatus.OK)
    .send({ message: "basic information submitted successfully" });
});

export { createIdUser };
