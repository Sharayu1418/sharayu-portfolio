import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const hasResendConfig =
      !!process.env.RESEND_API_KEY &&
      !!process.env.RESEND_FROM &&
      !!process.env.RESEND_TO;

    if (hasResendConfig) {
      const payload = {
        from: process.env.RESEND_FROM as string,
        to: [process.env.RESEND_TO as string, email],
        subject: `New portfolio contact from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>`,
      };

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Resend error", await res.text());
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 },
        );
      }
    } else {
      // Mocked mode: log to server console and still return success.
      console.log("[CONTACT_FORM]", { name, email, message });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error", error);
    return NextResponse.json(
      { error: "Unexpected error while submitting contact form" },
      { status: 500 },
    );
  }
}


