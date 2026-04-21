import nodemailer from "nodemailer";

import { env } from "../config/env.js";
import { db } from "./store.js";
import { createId, now } from "./utils.js";

const transporter =
  env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS
    ? nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT ?? 587,
        secure: false,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS
        }
      })
    : null;

type NotificationInput = {
  title: string;
  message: string;
  emailTo?: string;
  whatsappNumber?: string;
};

export async function notifyChannels(input: NotificationInput) {
  db.notifications.unshift({
    id: createId("notification"),
    title: input.title,
    message: input.message,
    channel: "dashboard",
    createdAt: now()
  });

  if (input.emailTo && transporter) {
    await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: input.emailTo,
      subject: input.title,
      text: input.message
    });

    db.notifications.unshift({
      id: createId("notification"),
      title: input.title,
      message: `Email sent to ${input.emailTo}`,
      channel: "email",
      createdAt: now()
    });
  }

  if (input.whatsappNumber) {
    db.notifications.unshift({
      id: createId("notification"),
      title: input.title,
      message: `WhatsApp notification queued for ${input.whatsappNumber}`,
      channel: "whatsapp",
      createdAt: now()
    });
  }
}
