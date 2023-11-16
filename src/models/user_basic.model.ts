import mongoose, { Document, Model, Types } from "mongoose";
import { toJSON, paginate } from "./plugins";

export interface IUserBasic {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  marital_status: string;
  state: string;
  user: any;
  phone: string;
  disability: boolean;
  nationality: string;
  socials: string[];
  religion: string;
  dob: Date;
  isVerified?: boolean;
}

const userBasicSchema = new mongoose.Schema<IUserBasic>(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    middle_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    marital_status: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    disability: {
      type: Boolean,
      required: true,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },
    religion: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    socials: {
      type: [String],
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userBasicSchema.plugin(toJSON);
userBasicSchema.plugin(paginate);

const UserBasic = mongoose.model<IUserBasic>("UserBasic", userBasicSchema);

export default UserBasic;
