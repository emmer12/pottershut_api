import mongoose, { Document, Model, Types } from "mongoose";
import validator from "validator";
import { toJSON, paginate } from "./plugins";
import slug from "mongoose-slug-generator";
import { approval_status } from "../config/constants";


mongoose.plugin(slug);


export interface IStore extends Document {
  store_name: string;
  slug: string;
  store_email?: string;
  store_phone?: string;
  store_phone_ext: string;
  store_address?: string;
  logo?: string;
  user: any;
  default_currency_code?: string;
  revenue: number;
  approval_status: string;
  earnings: number;
  balance: number;
}


const storeSchema = new mongoose.Schema<IStore>(
  {
    store_name: {
      type: String,
      required: true,
      unique: false,
    },
    slug: { type: String, unique: true, slug: "store_name" },
    store_phone: {
      type: String,
      trim: true,
      unique: false,
    },
    store_phone_ext: {
      type: String,
      trim: true,
      unique: false,
      default: '234'
    },
    logo: {
      type: String,
    },
    user: { type: Types.ObjectId, ref: "User", required: true },
    store_address: {
      type: String,
    },
    default_currency_code: {
      type: String,
      default: "USD"
    },
    revenue: {
      type: Number,
      default: 0,
    },
    approval_status: {
      type: String,
      enum: Object.values(approval_status),
      default: approval_status.PENDING
    },
    earnings: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
storeSchema.plugin(toJSON);
storeSchema.plugin(paginate);

const Store = mongoose.model<IStore>("Store", storeSchema);

export default Store;
