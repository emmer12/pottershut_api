import ApiError from "../utils/ApiError";

const passport = require("passport");
const httpStatus = require("http-status");

const { roleRights } = require("../config/roles");

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);

      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );

      if (!hasRequiredRights && user.role !== 'admin') {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
    }

    if (requiredRights == "kyc" && !user.kyc_enabled) {
      return reject(
        new ApiError(
          httpStatus.FORBIDDEN,
          "Forbidden, In order to utilize this endpoint, kindly make the payment for the KYC."
        )
      );
    }

    resolve();
  };

const auth =
  (...requiredRights) =>
    async (req, res, next) => {
      return new Promise((resolve, reject) => {
        passport.authenticate(
          "jwt",
          { session: false },
          verifyCallback(req, resolve, reject, requiredRights)
        )(req, res, next);
      })
        .then(() => next())
        .catch((err) => next(err));
    };

export default auth;
