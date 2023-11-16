import { Document, model, Schema, Types } from "mongoose";
import { toJSON } from "./plugins";

export interface IGeo {
  country: string;
  state: string;
  city: string;
  zip: number;
  home_address_1: string;
  home_address_2?: string;
  office_address_1?: string;
  office_address_2?: string;
  long: number;
  lat: number;
  ip: string;
  user: any;
  isVerified?: boolean;
}

const UserGeoSchema = new Schema<IGeo>(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zip: {
      type: Number,
      required: true,
      trim: true,
    },
    home_address_1: {
      type: String,
      required: true,
      trim: true,
    },
    home_address_2: {
      type: String,
      required: false,
      trim: true,
    },
    office_address_1: {
      type: String,
      required: false,
      trim: true,
    },
    office_address_2: {
      type: String,
      required: false,
      trim: true,
    },
    long: {
      type: Number,
      required: false,
      trim: true,
    },
    lat: {
      type: Number,
      required: false,
      trim: true,
    },
    ip: {
      type: String,
      required: false,
      trim: true,
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
UserGeoSchema.plugin(toJSON);

const UserGeo = model<IGeo>("UserGeo", UserGeoSchema);

export default UserGeo;
