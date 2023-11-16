import mongoose, { Document, model, Schema, Types } from "mongoose";
import { visibility_status } from "../config/constants";
import slug from "mongoose-slug-generator";
import config from "../config/config";
import validator from "validator";

mongoose.plugin(slug);

export interface ITrip {
  title: string;
  slug?: any;
  description: string;
  additional_information: string;
  inclusion: string[],
  exclusion: string[],
  price: number,
  user: any;
  images?: any;
  visibility_status: string;
  meta_title?: string;
  meta_description?: string;
}

const tripSchema = new Schema<ITrip>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, slug: "title" },
    description: { type: String, required: true },
    additional_information: { type: String, required: false },
    // price: {
    //   type: Number,
    //   required: true,
    //   validate(value: number) {
    //     if (!validator.isNumeric(value) || value < 0) {
    //       throw new Error("Invalid numeric value");
    //     }
    //   },
    // },
    price: {
      type: Number,
      required: true
    },
    inclusion: [
      { type: String, required: true }
    ],
    exclusion: [
      { type: String, required: true }
    ],
    user: { type: Types.ObjectId, ref: "User", default: null },
    visibility_status: {
      type: String, enum: [visibility_status.DRAFT, visibility_status.LIVE], default: visibility_status.DRAFT
    },
    meta_title: { type: String, required: false },
    meta_description: { type: String, required: false },
    images: [
      { type: Types.ObjectId, ref: "Images", default: [] },
    ],
  },
  { timestamps: true }
);

const Trip = model<ITrip>("Trip", tripSchema);

export default Trip;

