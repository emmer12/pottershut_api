"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const plugins_1 = require("./plugins");
const UserGeoSchema = new mongoose_1.Schema({
    city: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    zip: {
        type: Number,
        required: true,
        trim: true,
    },
    home_address_1: {
        type: String,
        required: true,
        trim: true,
    },
    home_address_2: {
        type: String,
        required: false,
        trim: true,
    },
    office_address_1: {
        type: String,
        required: false,
        trim: true,
    },
    office_address_2: {
        type: String,
        required: false,
        trim: true,
    },
    long: {
        type: Number,
        required: false,
        trim: true,
    },
    lat: {
        type: Number,
        required: false,
        trim: true,
    },
    ip: {
        type: String,
        required: false,
        trim: true,
    },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// add plugin that converts mongoose to json
UserGeoSchema.plugin(plugins_1.toJSON);
const UserGeo = (0, mongoose_1.model)("UserGeo", UserGeoSchema);
exports.default = UserGeo;
