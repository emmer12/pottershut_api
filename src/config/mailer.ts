import config from "./config";

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

const mailer = async (
  htmlBody: string,
  subject: string,
  to: string,
  priority?: string
) => {
  let info = await transporter.sendMail({
    from: '"VetMe Team" <info@vetmeblock.com>', // sender address
    to: to,
    subject: subject,
    html: htmlBody,
    headers: {
      priority: priority ?? "normal",
    },
  });

  console.log("Message sent: %s", info.messageId);
};

export { mailer };
