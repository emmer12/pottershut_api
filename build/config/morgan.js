"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.successHandler = void 0;
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const morgan = require("morgan");
morgan.token("message", (req, res) => res.locals.errorMessage || "");
const getIpFormat = () => config_1.default.env === "production" ? ":remote-addr - " : "";
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
const successHandler = morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: message => logger_1.default.info(message.trim()) },
});
exports.successHandler = successHandler;
const errorHandler = morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: message => logger_1.default.error(message.trim()) },
});
exports.errorHandler = errorHandler;
