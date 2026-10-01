import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 150;

function sanitize(value: string) {
  return value.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHtmlEmail({ name, email, subject, message }: { name: string; email: string; subject: string; message: string; }) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 24px; }
        .container { max-width: 680px; margin: 0 auto; background: #111827; border-radius: 16px; padding: 24px; }
        h1 { color: #38bdf8; font-size: 24px; }
        p { line-height: 1.6; }
        .label { color: #94a3b8; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; }
        .value { color: #f8fafc; margin-bottom: 16px; }
        .message { white-space: pre-wrap; background: #0f172a; padding: 16px; border-radius: 12px; border: 1px solid rgba(148, 163, 184, 0.15); }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New portfolio contact request</h1>
        <div>
          <div class="label">Name</div>
          <div class="value">${name}</div>
        </div>
        <div>
          <div class="label">Email</div>
          <div class="value">${email}</div>
        </div>
        <div>
          <div class="label">Subject</div>
          <div class="value">${subject}</div>
        </div>
        <div>
          <div class="label">Message</div>
          <div class="message">${message}</div>
        </div>
      </div>
    </body>
  </html>`;
}

function buildConfirmationMail({ name, email }: { name: string; email: string; }) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { font-family: Arial, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
        .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; }
        h1 { color: #0f172a; font-size: 24px; }
        p { line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thanks for reaching out, ${name}!</h1>
        <p>We received your message and I will get back to you as soon as possible.</p>
        <p>Here is a copy of the message you sent:</p>
        <p>If you need to update anything, feel free to reply to this email.</p>
      </div>
    </body>
  </html>`;
}

export async function POST(request: NextRequest) {
  const data = await request.json().catch(() => null);

  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = sanitize(String(data.name || "")).slice(0, MAX_NAME_LENGTH);
  const email = sanitize(String(data.email || ""));
  const subject = sanitize(String(data.subject || "")).slice(0, MAX_SUBJECT_LENGTH);
  const message = sanitize(String(data.message || "")).slice(0, MAX_MESSAGE_LENGTH);

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  if (!subject) {
    return NextResponse.json({ error: "Subject is required." }, { status: 400 });
  }

  if (!message || message.length < 10) {
    return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASS;
  const contactEmail = process.env.CONTACT_EMAIL || smtpUser;

  if (!smtpUser || !smtpPass) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    const adminMail = await transporter.sendMail({
      from: smtpUser,
      to: contactEmail,
      subject: `New contact from ${name} — ${subject}`,
      replyTo: email,
      html: buildHtmlEmail({ name, email, subject, message }),
    });

    if (adminMail.accepted.length === 0) {
      throw new Error("Mail not accepted by SMTP server.");
    }

    // Send confirmation email asynchronously without waiting (fire and forget)
    transporter.sendMail({
      from: smtpUser,
      to: email,
      subject: "Thanks for contacting me",
      html: buildConfirmationMail({ name, email }),
    }).catch((error) => {
      console.error("Failed to send confirmation email:", error);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json({ error: "Unable to send your message at this time." }, { status: 502 });
  }
}
