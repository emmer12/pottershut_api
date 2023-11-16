import { Document, model, Schema, Types } from "mongoose";
import { toJSON } from "./plugins";
import { id_type } from "../config/constants";

export interface IId {
  id_type: string;
  expiration_date: Date;
  card_number: string;
  doc_path: string;
  proof_path: string;
  user: any;
  isVerified?: boolean;
}

const UserIdSchema = new Schema<IId>(
  {
    id_type: {
      type: String,
      enum: Object.values(id_type),
      required: true,
    },
    expiration_date: {
      type: Date,
      required: true,
    },
    card_number: {
      type: String,
      required: true,
    },
    doc_path: {
      type: String,
    },
    proof_path: {
      type: String,
    },
    user: { type: Types.ObjectId, ref: "User", required: true },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
UserIdSchema.plugin(toJSON);

const UserId = model<IId>("UserId", UserIdSchema);

export default UserId;
