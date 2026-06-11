const express = require("express");
const { Resend } = require("resend");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Bizwire Contact Form <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: subject ? `[Bizwire] ${subject}` : `[Bizwire] New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#000;padding:24px 32px;">
            <h2 style="color:#a17635;margin:0;font-size:20px;">New Contact Form Submission</h2>
          </div>
          <div style="padding:32px;border:1px solid #e2e8f0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#6a7c92;width:100px;"><strong>Name</strong></td><td style="padding:8px 0;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6a7c92;"><strong>Email</strong></td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6a7c92;"><strong>Phone</strong></td><td style="padding:8px 0;">${phone || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#6a7c92;"><strong>Subject</strong></td><td style="padding:8px 0;">${subject || "—"}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
            <p style="color:#6a7c92;margin:0 0 8px;"><strong>Message</strong></p>
            <p style="color:#000;line-height:1.7;white-space:pre-line;">${message}</p>
          </div>
        </div>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

module.exports = router;
