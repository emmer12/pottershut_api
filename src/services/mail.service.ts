import config from "../config/config";
import { mailer } from "../config/mailer";

const sendOtp = (otp: string, toEmail: string) => {
  const content = `
  <div style="max-width: 600px; ">
    <p><span style="font-weight: 400;">Hi there, </span></p>
    <p>&nbsp;</p>
    <p><span style="font-weight: 400;">Your verification code is:</span></p>
    <p><span style="font-weight: 400;">${otp}</span></p>
    <p><span style="font-weight: 400;">The verification code will be valid for 15 minutes. </span></p>
    <p><span style="font-weight: 400;">This is an automated message, please do not replay</span></p>
    <p>&nbsp;</p>
    <p><span style="font-weight: 400;">Thank you!</span></p>
    <p><span style="font-weight: 400;">Regards,</span></p>
    <p><span style="font-weight: 400;">VetMe</span></p>
  </div>
`;
  return mailer(content, `Otp Verification`, toEmail, "high");
};

const sendKycNotification = () => {
  const content = `
  <div style="max-width: 600px; ">
    <p><span style="font-weight: 400;">Hi there, </span></p>
    <p>&nbsp;</p>
    <p><span style="font-weight: 400;">A user just completed KYC</span></p>
    <p><span style="font-weight: 400;">Regards,</span></p>
    <p><span style="font-weight: 400;">VetMe</span></p>
  </div>
`;

  const toEmail = config.adminEmail;
  return mailer(content, `KYC Notification`, toEmail, "high");
};

export { sendOtp, sendKycNotification };
