import * as httpStatus from "http-status";
import { IUser } from "../models/user.model";
import {
    saveStore,
    getStore as getStoreByUser
} from "../services/store.service";
import catchAsync from "../utils/catchAsync";

const createStore = catchAsync(async (req, res) => {
    const {
        user,
        body,
    }: { user: IUser; body: any } = req;
    if (!user.account_verification) {
        return res.status(httpStatus.UNAUTHORIZED).send({
            message: "This account has not been verified",
        });
    }
    await saveStore(body, user);
    res.status(httpStatus.OK).send({ message: "created successfully" });
});

const getStore = catchAsync(async (req, res) => {
    const { user }: { user: IUser } = req;
    const store = await getStoreByUser(user.id);

    res.status(httpStatus.OK).send({ store });
});



export {
    createStore,
    getStore
};
