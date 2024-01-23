import mongoose, { model, Schema, Types } from "mongoose";

export interface IOrderItem {
    order: any;
    product: any;
    price: number;
    store: any;
    qty: number
}

const orderItemSchema = new Schema<IOrderItem>(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        store: { type: Types.ObjectId, ref: "Store", required: true },
        price: {
            type: Number,
            required: true,
        },
        qty: {
            type: Number,
            required: true,
        },
    },
);

const OrderItem = model<IOrderItem>("OrderItem", orderItemSchema);

export default OrderItem;
