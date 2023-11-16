import mongoose, { Document, model, Schema, Types } from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

export interface IPCategory {
  title: string;
  slug: string;
  description?: string;
  preview?: string;
}

const productCategorySchema = new Schema<IPCategory>(
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

const ProductCategory = model<IPCategory>("ProductCategory", productCategorySchema);

export default ProductCategory;
