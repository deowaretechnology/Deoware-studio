// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  weddingDate: string;
  plan: string;
  message: string;
}

const planLabels: Record<string, string> = {
  starter: 'Starter  — ₹2,999',
  premium: 'Premium  — ₹4,999',
  luxury:  'Luxury   — ₹5,999',
  custom:  'Custom   — Let\'s Talk',
};

// ─── POST /api/contact ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;
    const { name, email, phone, weddingDate, plan, message } = body;

    // Basic validation
    if (!name || !email || !phone || !weddingDate || !plan) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── Nodemailer transporter (Gmail SMTP) ───────────────────────────────────
    // Set these in your .env.local:
    //   EMAIL_USER=deowaretechnology@gmail.com
    //   EMAIL_PASS=your_gmail_app_password   ← NOT your Gmail login password
    //   EMAIL_TO=deowaretechnology@gmail.com  (where you want to receive leads)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const formattedDate = weddingDate
      ? new Date(weddingDate).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : '—';

    // ── Email to YOU (lead notification) ──────────────────────────────────────
    await transporter.sendMail({
      from: `"Vivah Cards Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO ?? process.env.EMAIL_USER,
      replyTo: email,
      subject: `🎊 New Wedding Inquiry — ${name} (${planLabels[plan] ?? plan})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: 'Georgia', serif; background: #FFF9EE; margin: 0; padding: 0; }
            .wrapper { max-width: 580px; margin: 32px auto; background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #F5D060; }
            .header { background: linear-gradient(135deg, #D4A017, #9A6E00); padding: 28px 32px; text-align: center; }
            .header h1 { color: #fff; font-size: 22px; margin: 0; letter-spacing: 0.05em; }
            .header p { color: #FFF3DC; font-size: 13px; margin: 6px 0 0; }
            .body { padding: 32px; }
            .row { display: flex; margin-bottom: 18px; border-bottom: 1px solid #FFF3DC; padding-bottom: 18px; }
            .row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
            .label { width: 140px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #A07850; flex-shrink: 0; padding-top: 2px; }
            .value { font-size: 15px; color: #2A1D0F; font-weight: 500; flex: 1; }
            .plan-badge { display: inline-block; background: linear-gradient(135deg, #D4A017, #9A6E00); color: #fff; padding: 4px 14px; border-radius: 999px; font-size: 13px; font-weight: 600; }
            .message-box { background: #FFF9EE; border-left: 3px solid #D4A017; padding: 14px 18px; border-radius: 0 8px 8px 0; font-size: 14px; color: #5E4228; line-height: 1.7; }
            .footer { text-align: center; padding: 20px 32px; background: #FFF9EE; font-size: 12px; color: #A07850; border-top: 1px solid #F5D060; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>✦ New Wedding Inquiry ✦</h1>
              <p>Received via Vivah Cards website</p>
            </div>
            <div class="body">
              <div class="row">
                <span class="label">Name</span>
                <span class="value">${name}</span>
              </div>
              <div class="row">
                <span class="label">Email</span>
                <span class="value"><a href="mailto:${email}" style="color:#D4A017;">${email}</a></span>
              </div>
              <div class="row">
                <span class="label">Phone</span>
                <span class="value"><a href="tel:${phone}" style="color:#D4A017;">${phone}</a></span>
              </div>
              <div class="row">
                <span class="label">Wedding Date</span>
                <span class="value">📅 ${formattedDate}</span>
              </div>
              <div class="row">
                <span class="label">Plan Selected</span>
                <span class="value"><span class="plan-badge">${planLabels[plan] ?? plan}</span></span>
              </div>
              <div class="row">
                <span class="label">Message</span>
                <span class="value">
                  <div class="message-box">${message || '(No message provided)'}</div>
                </span>
              </div>
            </div>
            <div class="footer">
              Reply directly to this email to contact ${name} at ${email}
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // ── Auto-reply to CLIENT ───────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Vivah Cards" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🎊 We received your inquiry, ${name.split(' ')[0]}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: 'Georgia', serif; background: #FFF9EE; margin: 0; padding: 0; }
            .wrapper { max-width: 560px; margin: 32px auto; background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #F5D060; }
            .header { background: linear-gradient(135deg, #D4A017, #9A6E00); padding: 28px 32px; text-align: center; }
            .header h1 { color: #fff; font-size: 22px; margin: 0; }
            .header p { color: #FFF3DC; font-size: 13px; margin: 8px 0 0; }
            .body { padding: 32px; color: #3D2B18; font-size: 15px; line-height: 1.8; }
            .highlight { color: #D4A017; font-weight: 600; }
            .plan-box { background: #FFF9EE; border: 1px solid #F5D060; border-radius: 10px; padding: 16px 20px; margin: 20px 0; text-align: center; }
            .plan-box .plan-name { font-size: 20px; font-weight: 700; color: #9A6E00; }
            .plan-box .plan-price { font-size: 14px; color: #A07850; margin-top: 4px; }
            .footer { text-align: center; padding: 20px 32px; background: #FFF9EE; font-size: 12px; color: #A07850; border-top: 1px solid #F5D060; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>✦ Thank You, ${name.split(' ')[0]}! ✦</h1>
              <p>Your wedding website inquiry has been received.</p>
            </div>
            <div class="body">
              <p>Dear <span class="highlight">${name}</span>,</p>
              <p>
                Thank you for reaching out to <strong>Vivah Cards</strong>! 
                We are thrilled to be a part of your special day. 🎊
              </p>
              <p>You've selected:</p>
              <div class="plan-box">
                <div class="plan-name">${planLabels[plan] ?? plan}</div>
                <div class="plan-price">Wedding Date: ${formattedDate}</div>
              </div>
              <p>
                Our team will review your inquiry and get back to you at 
                <span class="highlight"> ${email} </span> or 
                <span class="highlight"> ${phone} </span> 
                within <strong>24 hours</strong>.
              </p>
              <p>
                In the meantime, feel free to WhatsApp us at 
                <a href="https://wa.me/918969457707" style="color:#D4A017;">+91 8969457707</a> 
                for any urgent queries.
              </p>
              <p style="margin-top: 24px;">Warm regards,<br/><strong>Team Vivah Cards</strong><br/>
              <span style="font-size:13px; color:#A07850;">by Deoware Technology</span></p>
            </div>
            <div class="footer">
              © 2025 Vivah Cards · Deoware Technology, Kolkata
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact API error]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}