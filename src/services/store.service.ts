import Store, { IStore } from "../models/store.model";
import ProductCategory, { IPCategory } from "../models/product.category.model";
import { visibility_status } from "../config/constants";
import httpStatus from "http-status";

const saveStore = async (payload: IStore, user) => {
    payload.user = user._id;

    const hasStore = await getStore(payload.user)

    if (hasStore) {
        throw new Error("You already have a store.")
    }


    const response = await Store.create(payload);
    return response[0];
};

const getStore = async (user_id: string) => {
    const store = await Store.findOne({ user: user_id })
    return store;
}

const getStoreById = async (store_id: string) => {
    return (await Store.findById(store_id)).populate('user');
}


export {
    saveStore,
    getStore,
    getStoreById
};
