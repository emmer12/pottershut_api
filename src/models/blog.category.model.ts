import mongoose, { Document, model, Schema, Types } from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

export interface ICategory {
  title: string;
  slug: string;
  description?: string;
  preview?: string;
}

const blogCategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    description: { type: String, required: false },
    preview: { type: String, required: false },
  },
);

const BlogCategory = model<ICategory>("BlogCategory", blogCategorySchema);

export default BlogCategory;
