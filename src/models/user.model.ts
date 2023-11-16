import mongoose, { Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { toJSON, paginate } from "./plugins";
import { roles } from "../config/roles";
import { user_type } from "../config/constants";
import { UNAVAILABLE_FOR_LEGAL_REASONS } from "http-status";


export interface IUser extends Document {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone: string;
  phone_ext: string;
  password: string;
  role: string;
  user_type: string;
  isPasswordMatch: (password: string) => Promise<boolean>;
  account_verification: boolean;
  googleId: string;
  picture: string;
}

interface UserModel extends Model<IUser> {
  isEmailTaken: (email: string, excludeUserId?: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      unique: false,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      unique: false,
    },
    middle_name: {
      type: String,
      required: false,
      trim: true,
      unique: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    phone_ext: {
      type: String,
      trim: true,
      default: '234'
    },
    user_type: {
      type: String,
      enum: Object.values(user_type),
      //default: user_type.EMPLOYEE,
      required: false,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: "user",
    },
    account_verification: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId?: string
) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
