"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("./utils/ApiError"));
// ES6 import syntax
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = require("./config/morgan");
const passport_2 = require("./config/passport");
const error_1 = require("./middlewares/error");
const express_multipart_file_parser_1 = require("express-multipart-file-parser");
const v1_1 = __importDefault(require("./routes/v1"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.static('public'));
app.use(morgan_1.successHandler);
app.use(morgan_1.errorHandler);
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_multipart_file_parser_1.fileParser)({
    rawBodyOptions: {
        limit: "30mb",
    },
    busboyOptions: {
        limits: {
            fields: 50,
        },
    },
}));
app.use((0, xss_clean_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
// gzip compression
app.use((0, compression_1.default)());
// enable cors
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
// jwt authentication
app.use(passport_1.default.initialize());
passport_1.default.use("jwt", passport_2.jwtStrategy);
passport_1.default.use(passport_2.googleStrategy);
// limit repeated failed requests to auth endpoints
// if (config.env === "production") {
//   app.use("/v1/auth", authLimiter);
// }
// v1 api routes
app.use("/api/v1", v1_1.default);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError_1.default(http_status_1.default.NOT_FOUND, "Not found"));
});
// convert error to ApiError, if needed
app.use(error_1.errorConverter);
// handle error
app.use(error_1.errorHandler);
