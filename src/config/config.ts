const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(process.env.PORT || 3000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    DB_NAME: Joi.string().required().description("DB Name"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    CRYPTO_SECRET: Joi.string().required().description("Crypto secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10),

    // MAIL
    MAIL_HOST: Joi.string().required().description("SMTP Host"),
    MAIL_PORT: Joi.string().required().description("SMTP Port"),
    MAIL_USER: Joi.string().required().description("SMTP User"),
    MAIL_PASS: Joi.string().required().description("SMTP Password"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      dbName: envVars.DB_NAME,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  crypto: {
    secret: envVars.CRYPTO_SECRET,
  },
  mail: {
    host: envVars.MAIL_HOST,
    port: envVars.MAIL_PORT,
    user: envVars.MAIL_USER,
    pass: envVars.MAIL_PASS,
  },
  adminEmail: envVars.ADMIN_EMAIL,
  server_url: envVars.SERVER_URL
};

export default config;
