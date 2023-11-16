import { Document, model, Schema, Types } from "mongoose";
import { toJSON } from "./plugins";
import { sub_type, payment_status } from "../config/constants";

export interface ISub {
  sub_type: String;
  reference: string;
  user: any;
  amount: number;
  payment_status: string;
  hash: string;
  chain: number;
}

const UserSubSchema = new Schema<ISub>(
  {
    sub_type: {
      type: String,
      enum: Object.values(sub_type),
      default: sub_type.INDIVIDUAL,
      required: true,
    },
    user: { type: Types.ObjectId, ref: "User", required: true },
    payment_status: {
      type: String,
      enum: Object.values(payment_status),
      default: payment_status.UNPAID,
      required: true,
    },
    amount: {
      type: Number,
    },
    reference: {
      type: String,
    },
    hash: {
      type: String,
    },
    chain: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
UserSubSchema.plugin(toJSON);

const UserSub = model<ISub>("UserSub", UserSubSchema);

export default UserSub;
