import * as httpStatus from "http-status";
import { IUser } from "../models/user.model";
import catchAsync from "../utils/catchAsync";
import { getProductById } from "../services/product.service";
import Order from "../models/order.model";
import { generateOrderCode } from "../services/order.service";
import OrderItem from "../models/order_items.model";
import { sendVendorOrderNotification } from "../services/mail.service";
import { getStoreById } from "../services/store.service";

const createOrder = catchAsync(async (req, res) => {
  const {
    user,
    body,
  }: { user: IUser; body: any } = req;

  const { items } = body;
  const itemsData = [];
  for (const item of items) {
    const product = await getProductById(item.product_id)
    itemsData.push({
      price: product.price,
      qty: item.qty,
      subtotal: product.price * item.qty,
      store: product.store
    })
  }

  const store = itemsData.map((i) => i.store);
  const subtotal = itemsData.reduce((a, c) => a + c.subtotal, 0)
  const total = subtotal;

  const order = await Order.create({
    ...body,
    items: [],
    user: user._id,
    order_code: generateOrderCode(),
    store_ids: store,
    total,
    subtotal
  })

  for (const item of itemsData) {
    const result = await OrderItem.create({
      order: order._id,
      product: item.product_id,
      store: item.store,
      price: item.price,
      qty: item.qty,
    })

    order.items.push(result._id)
    await order.save();
  }

  // TODO: NOTIFY STORE OWNER AND ADMIN 

  const storeIds = new Set(order.store_ids.map((v) => v.toString()));
  for (const id of storeIds) {
    const { email } = (await getStoreById(id)).user;
    sendVendorOrderNotification(email)
  }



  res.status(httpStatus.OK).send({ message: "created successfully hello" });
});


export {
  createOrder,

};
