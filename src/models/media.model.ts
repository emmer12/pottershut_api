import mongoose, { Document, model, Schema, Types } from "mongoose";
import slug from "mongoose-slug-generator";
import { media_collections, media_disk, media_model } from "../config/constants";

mongoose.plugin(slug);

export interface IMedia {
    collection_name: string;
    model_type: string;
    filename: string;
    mime_type: string;
    disk: string;
    size: number;
    responsiveImages: any,
    model: any;
    onModel: string;
}

const mediaSchema = new Schema<IMedia>(
    {
        collection_name: {
            type: String,
            enum: Object.values(media_collections),
        },
        model_type: {
            type: String,
        },
        filename: {
            type: String,
            required: true
        },
        mime_type: {
            type: String,
        },
        disk: {
            type: String,
            enum: Object.values(media_disk),
            default: media_disk.PUBLIC,

        },
        size: {
            type: Number,
        },
        responsiveImages: { type: String },
        model: { type: Types.ObjectId, required: true, refPath: 'onModel' },
        onModel: {
            type: String,
            required: true,
            enum: Object.values(media_model),
        },
    },
);

const Media = model<IMedia>("Media", mediaSchema);

export default Media;
