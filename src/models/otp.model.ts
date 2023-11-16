import { Document, model, Schema } from "mongoose";
import { toJSON } from "./plugins";

interface IOtp extends Document {
  otp: string;
  expiration_time: Date;
  verified: boolean;
}

const otpSchema = new Schema<IOtp>(
  {
    otp: {
      type: String,
      required: true,
    },
    expiration_time: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
otpSchema.plugin(toJSON);

const Token = model<IOtp>("Otp", otpSchema);

export default Token;
