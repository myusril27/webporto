import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, message, token } = await req.json();

    // ✅ Verify reCAPTCHA dulu
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
      { method: "POST" }
    );
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return new Response(JSON.stringify({ error: "reCAPTCHA gagal diverifikasi" }), { status: 400 });
    }

    // ✅ Kirim email pakai Resend
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.RECEIVER_EMAIL,
      subject: `Pesan Baru dari ${name}`,
      html: `
        <h2>Pesan Baru dari Portfolio</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>No. WhatsApp:</strong> ${phone}</p>
        <p><strong>Pesan:</strong><br/>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Gagal mengirim pesan" }), { status: 500 });
  }
}
