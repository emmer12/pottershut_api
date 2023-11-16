import * as httpStatus from "http-status";
import { IUser } from "../models/user.model";
import {
    saveStore
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



export {
    createStore,
};
