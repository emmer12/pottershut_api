import otpGenerator from "otp-generator";
import bcrypt from "bcryptjs";
import Otp from "../models/otp.model";
import { addMinuteToDate } from "./date.service";
import { encrypt } from "./crypto.service";

const generateOtp = async (payload) => {
  const otp = otpGenerator.generate(4, {
    digit: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const encryptedOtp = await crypt(otp);
  const otp_instance = await saveOtp(encryptedOtp);

  const details = {
    check: payload.email,
    timestamp: new Date(),
    success: true,
    message: "OTP sent to user",
    otp_id: otp_instance._id,
  };

  const verification_key = encrypt(details);
  return {
    verification_key,
    otp,
  };
};

const verifyOtp = (databaseOtp, otp) => {
  return bcrypt.compare(otp, databaseOtp);
};

const crypt = async (otp: number) => {
  return await bcrypt.hash(otp, 8);
};

const saveOtp = async (otp: number) => {
  const now = new Date();
  const expiration_time = addMinuteToDate(now, 15);

  const otpDoc = Otp.create({
    otp,
    expiration_time,
  });

  return otpDoc;
};

export { generateOtp, verifyOtp };
