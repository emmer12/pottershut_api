import { Document, model, Schema, Types } from "mongoose";
import { toJSON } from "./plugins";
import { sub_type, payment_status } from "../config/constants";

export interface ISub {
  sub_type: String;
  user: any;
  kyc_code: string;
  is_verified: boolean;
  sub_id: any;
  count: number;
}

const UserKycSchema = new Schema<ISub>(
  {
    sub_type: {
      type: String,
      enum: Object.values(sub_type),
      required: true,
    },
    user: { type: Types.ObjectId, ref: "User", required: true },
    sub_id: { type: Types.ObjectId, ref: "UserSub" },
    kyc_code: {
      type: String,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
UserKycSchema.plugin(toJSON);

const UserKyc = model<ISub>("UserKyc", UserKycSchema);

export default UserKyc;
