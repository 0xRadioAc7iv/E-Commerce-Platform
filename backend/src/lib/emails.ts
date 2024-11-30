import { configDotenv } from "dotenv";
import sgMail from "@sendgrid/mail";

configDotenv();
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = async (
  recipientEmail: string,
  title: string,
  message: string
) => {
  try {
    await sgMail.send({
      to: recipientEmail,
      from: process.env.SENDER_EMAIL_ADDRESS as string,
      subject: title,
      html: `<h2>${message}</h2>`,
    });
  } catch (error) {
    console.log(error);
  }
};
