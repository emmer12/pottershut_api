"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRights = exports.roles = void 0;
const roles = ["user", "admin"];
exports.roles = roles;
const roleRights = new Map();
exports.roleRights = roleRights;
roleRights.set(roles[0], ["logout", "kyc"]);
roleRights.set(roles[1], ["admin", "logout"]);
