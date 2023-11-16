"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visibility_status = exports.kycPricing = exports.payment_status = exports.sub_type = exports.id_type = exports.user_type = void 0;
exports.user_type = {
    EMPLOYER: "Employer",
    EMPLOYEE: "Employee",
};
exports.id_type = {
    NATIONAL_ID: "Employer",
    INTERNATIONAL_PASSPORT: "International passport",
    DRIVER_LICENSE: "Driver License",
};
exports.sub_type = {
    INDIVIDUAL: "individual",
    COMPANY: "company",
};
exports.payment_status = {
    PAID: "paid",
    UNPAID: "unpaid",
};
exports.kycPricing = {
    BASIC: {
        PRICE: 500,
        LIMIT: 1,
    },
    PRO: {
        PRICE: 1000,
        LIMIT: 4,
    },
};
exports.visibility_status = {
    DRAFT: "Draft",
    LIVE: "Live",
};
