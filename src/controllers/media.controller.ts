import * as httpStatus from "http-status";
import { IUser } from "../models/user.model";
import catchAsync from "../utils/catchAsync";
import { handleSingleFile, handleSingleImage } from "../services/fileupload.service";

const uploadSingleMedia = catchAsync(async (req, res) => {
    const {
        user,
        body,
    }: { user: IUser; body: any } = req;


    handleSingleImage(req, true)

    res.status(httpStatus.OK).send({ message: "uploaded successfully" });
});


const uploadMultipleMedia = catchAsync(async (req, res) => {
    const {
        user,
        body,
    }: { user: IUser; body: any } = req;

    res.status(httpStatus.OK).send({ message: "created successfully" });
});




export {
    uploadSingleMedia,
    uploadMultipleMedia

};
