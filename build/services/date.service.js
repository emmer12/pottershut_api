"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMinuteToDate = void 0;
const addMinuteToDate = (now, minutes) => {
    return new Date(now.getTime() + minutes * 60 * 1000);
};
exports.addMinuteToDate = addMinuteToDate;
