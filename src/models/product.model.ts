import mongoose, { Document, model, Schema, Types } from "mongoose";
import { approval_status, visibility_status, product_type, listing_type } from "../config/constants";
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
    product_type: string;
    listing_type: string;
    approval_status: string;
    meta_title?: string;
    meta_description?: string;
    weight?: number;
    length?: number;
    height?: number;
    width?: number;
    is_featured: boolean;
    is_pad: boolean;
    booking_required: number;
    booking_acquired: number;
    group_price: number
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
        weight: { type: Number },
        length: { type: Number },
        height: { type: Number },
        width: { type: Number },
        category: { type: Types.ObjectId, ref: "ProductCategory", required: true },
        images: [
            {
                file_path: { type: String },
                full_url: { type: String },
                mime_type: { type: String },
            }
        ],
        tags: { type: Array, required: false },
        approval_status: {
            type: String, enum: [approval_status.APPROVED, approval_status.DISAPPROVED, approval_status.PENDING], default: approval_status.PENDING
        },
        product_type: {
            type: String, enum: [product_type.PHYSICAL, product_type.DIGITAL], default: product_type.PHYSICAL
        },
        listing_type: {
            type: String, enum: [listing_type.NORMAL, listing_type.WEAVEPAD], default: listing_type.NORMAL
        },
        visibility_status: {
            type: String, enum: [visibility_status.DRAFT, visibility_status.LIVE], default: visibility_status.DRAFT
        },
        meta_title: { type: String, required: false },
        meta_description: { type: String, required: false },
        is_featured: {
            type: Boolean,
            default: false
        },
        booking_required: { type: Number },
        booking_acquired: { type: Number },
        group_price: { type: Number },
        is_pad: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);


export default Product;

