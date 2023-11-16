import * as Joi from "joi";
import { approval_status, visibility_status } from "../config/constants";


const updateApprovalStatus = {
    body: Joi.object().keys({
        approval_status: Joi.string().valid(...Object.values(approval_status)),
    }),
};

const updateVisibilityStatus = {
    body: Joi.object().keys({
        visibility_status: Joi.string().valid(...Object.values(visibility_status)),
    }),
};




export { updateApprovalStatus, updateVisibilityStatus };
