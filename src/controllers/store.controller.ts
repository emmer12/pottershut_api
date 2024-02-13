import * as httpStatus from "http-status";
import { IUser } from "../models/user.model";
import {
    saveStore,
    getStore as getStoreByUser
} from "../services/store.service";
import catchAsync from "../utils/catchAsync";
import { createUser, getUserByEmail } from "../services/user.service";
import { generateOtp } from "../services/otp.service";
import { sendOtp } from "../services/mail.service";

const createStore = catchAsync(async (req, res) => {
    const {
        body,
    }: { body: any } = req;

    let user;

    if (body.guest_type == "guest") {
        user = await createUser(req.body);
        const { otp, verification_key } = await generateOtp(user);
        sendOtp(otp, user.email);
    } else {
        user = await getUserByEmail(body.email);

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                message: "User Not found",
            });
        }

        const isPasswordMatch = await user.isPasswordMatch(body.password);
        if (!isPasswordMatch) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                message: "Invalid credentials",
            });
        }
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
