import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";
import type { AskResponse } from "@shared/api";

const askSchema = z.object({
  name: z.string().max(100).optional().default(""),
  country: z.string().max(100).optional().default(""),
  question: z.string().min(1).max(2000),
  email: z.string().email(),
  travelDate: z.string().optional(),
  website: z.string().optional().default(""),
});

function getTransporter() {
  const port = Number(process.env.TITAN_SMTP_PORT) || 465;
  return nodemailer.createTransport({
    host: process.env.TITAN_SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.TITAN_EMAIL,
      pass: process.env.TITAN_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3",
    },
  });
}

export const handleAsk: RequestHandler = async (req, res) => {
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { /* leave as-is */ }
  }
  if (Buffer.isBuffer(body)) {
    try { body = JSON.parse(body.toString("utf-8")); } catch { /* leave as-is */ }
  }

  const parsed = askSchema.safeParse(body);
  if (!parsed.success) {
    // DEBUG: temporarily return details so we can identify the issue
    res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
      _debug: {
        bodyType: typeof body,
        bodyIsNull: body === null,
        bodyIsUndefined: body === undefined,
        bodyIsBuffer: Buffer.isBuffer(req.body),
        bodyKeys: body && typeof body === "object" ? Object.keys(body) : null,
        bodyPreview: typeof body === "string" ? body.slice(0, 200) : null,
        zodErrors: parsed.error.issues,
      },
    });
    return;
  }

  if (parsed.data.website) {
    res.json({ success: true } satisfies AskResponse);
    return;
  }

  const { name, country, question, email, travelDate } = parsed.data;
  const who = [name, country].filter(Boolean).join(", ") || "Anonymous";

  const lines = [
    name ? `Name: ${name}` : null,
    country ? `Country: ${country}` : null,
    `Email: ${email}`,
    travelDate ? `Travel date: ${travelDate}` : null,
    ``,
    `Question:`,
    question,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await getTransporter().sendMail({
      from: process.env.TITAN_EMAIL,
      to: process.env.TITAN_EMAIL,
      replyTo: email,
      subject: `IndiaWithEase — New question from ${who}`,
      text: lines,
    });

    const response: AskResponse = { success: true };
    res.status(200).json(response);
  } catch (err) {
    console.error("Email send failed:", err);
    const response: AskResponse = {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
    res.status(500).json(response);
  }
};
