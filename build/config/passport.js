"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleStrategy = exports.jwtStrategy = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = __importDefault(require("./config"));
const tokens_1 = require("./tokens");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const jwtOptions = {
    secretOrKey: config_1.default.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const jwtVerify = (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (payload.type !== tokens_1.tokenTypes.ACCESS) {
            throw new Error("Invalid token type");
        }
        const user = yield user_model_1.default.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
});
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
exports.jwtStrategy = jwtStrategy;
// Google
const googleStrategy = new GoogleTokenStrategy({
    clientID: "965918499205-d1qbcmlaebs8r062vli1t6j2sshsu6ls.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // passReqToCallback: true,
}, function (accessToken, refreshToken, profile, done) {
    let { id, name, picture, email } = profile._json;
    user_model_1.default.findOne({ googleId: id }, function (err, user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                const newUser = new user_model_1.default({
                    googleId: id,
                    password: "password",
                    name: name,
                    picture: picture,
                    email: email,
                    account_verification: true,
                });
                user = yield newUser.save();
            }
            return done(err, user);
        });
    });
});
exports.googleStrategy = googleStrategy;
