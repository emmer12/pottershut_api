import mongoose, { Document, model, Schema, Types } from "mongoose";
import { visibility_status } from "../config/constants";
import slug from "mongoose-slug-generator";
import config from "../config/config";

mongoose.plugin(slug);

export interface IBlog {
  title: string;
  slug?: any;
  body: string;
  user: any;
  preview?: string;
  category: any;
  tags?: any
  visibility_status: string;
  meta_title?: string;
  meta_description?: string;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, slug: "title" },
    body: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "User", default: null },
    category: { type: Types.ObjectId, ref: "BlogCategory", required: true },
    preview: { type: String, required: false },
    tags: { type: Array, required: false },
    visibility_status: {
      type: String, enum: [visibility_status.DRAFT, visibility_status.LIVE], default: visibility_status.DRAFT
    },
    meta_title: { type: String, required: false },
    meta_description: { type: String, required: false },
  },
  { timestamps: true }
);

const Blog = model<IBlog>("Blog", blogSchema);


// Define a virtual property for the fullname
blogSchema.virtual('preview_url').get(function () {
  return `${config.server_url}/${this.preview}`;
});

export default Blog;

