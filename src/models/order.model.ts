import { Document, model, Schema, Types } from "mongoose";
import { payment_method, payment_status } from "../config/constants";

interface IOrder extends Document<Types.ObjectId> {
  user: any;
  total: number;
  subtotal: number;
  payment_status: string;
  shipping_status: string;
  updated_by: any;
  store_ids: any[];
  order_code: string;
  payment_method: string;
  shipping_price: number;
  full_name: string;
  phone: string;
  country: string;
  city: string;
  email: string;
  address: string;
  address2: string;
  items: any[]

}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    total: { type: Number },
    subtotal: { type: Number },
    store_ids: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Store",
      },
    ],
    order_code: {
      type: String,
      unique: true,
      required: true,
    },
    payment_method: {
      type: String,
      enum: [
        payment_method.FLUTTERWAVE,
      ],
      default: payment_method.FLUTTERWAVE,
    },
    payment_status: {
      type: String,
      enum: [payment_status.PAID, payment_status.UNPAID],
      default: payment_status.UNPAID,
    },
    shipping_price: {
      type: Number,
      default: 0,
    },
    full_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: false,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "order_items",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
