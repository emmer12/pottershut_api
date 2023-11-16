import User from "../models/user.model";
import config from "./config";
import { tokenTypes } from "./tokens";
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

// Google

const googleStrategy = new GoogleTokenStrategy(
  {
    clientID:
      "965918499205-d1qbcmlaebs8r062vli1t6j2sshsu6ls.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // passReqToCallback: true,
  },
  function (accessToken, refreshToken, profile, done) {
    let { id, name, picture, email } = profile._json;
    User.findOne({ googleId: id }, async function (err, user) {
      if (!user) {
        const newUser = new User({
          googleId: id,
          password: "password",
          name: name,
          picture: picture,
          email: email,
          account_verification: true,
        });

        user = await newUser.save();
      }
      return done(err, user);
    });
  }
);

export { jwtStrategy, googleStrategy };
