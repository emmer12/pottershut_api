import mongoose, { Document, model, Schema, Types } from "mongoose";
import { approval_status, visibility_status } from "../config/constants";
import slug from "mongoose-slug-generator";
import config from "../config/config";

mongoose.plugin(slug);

export interface IProduct {
    title: string;
    slug?: any;
    description: string;
    user: any;
    store: any;
    images?: any;
    category: any;
    price: number;
    tags?: any
    visibility_status: string;
    approval_status: string;
    meta_title?: string;
    meta_description?: string;
}

const productSchema = new Schema<IProduct>(
    {
        title: { type: String, required: true },
        slug: { type: String, unique: true, slug: "title" },
        description: { type: String, required: true },
        user: { type: Types.ObjectId, ref: "User", default: null },
        store: { type: Types.ObjectId, ref: "Store", default: null },
        price: {
            type: Number,
            required: true
        },
        category: { type: Types.ObjectId, ref: "BlogCategory", required: true },
        images: [
            { type: Types.ObjectId, ref: "ProductImages", default: [] },
        ],
        tags: { type: Array, required: false },
        approval_status: {
            type: String, enum: [approval_status.APPROVED, approval_status.DISAPPROVED, approval_status.PENDING], default: approval_status.PENDING
        },
        visibility_status: {
            type: String, enum: [visibility_status.DRAFT, visibility_status.LIVE], default: visibility_status.DRAFT
        },
        meta_title: { type: String, required: false },
        meta_description: { type: String, required: false },
    },
    { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);


export default Product;

