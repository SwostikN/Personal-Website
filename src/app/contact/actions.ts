"use server";

import { site } from "@/content/site";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; organisation: string; message: string };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim().slice(0, 120),
    email: String(formData.get("email") ?? "").trim().slice(0, 200),
    organisation: String(formData.get("organisation") ?? "").trim().slice(0, 160),
    message: String(formData.get("message") ?? "").trim().slice(0, 5000),
  };

  // Honeypot: real people never see or fill this field.
  if (String(formData.get("website") ?? "")) {
    return { status: "sent", message: "Thanks. Your message has been sent." };
  }
  // Bots post instantly; people take a few seconds.
  const startedAt = Number(formData.get("started") ?? 0);
  if (startedAt && Date.now() - startedAt < 2500) {
    return { status: "sent", message: "Thanks. Your message has been sent." };
  }

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address, like name@example.com.";
  if (values.message.length < 10) errors.message = "Please write a message of at least 10 characters.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "swostikn@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Swostik Nepal website <hello@swostikn.com.np>";
  if (!apiKey) {
    return {
      status: "error",
      message: `The form isn't connected yet. Please email ${site.email} directly; your message is still in the box below.`,
      values,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Portfolio enquiry from ${values.name}${values.organisation ? ` (${values.organisation})` : ""}`,
        text: `${values.message}\n\n— ${values.name}\n${values.email}${values.organisation ? `\n${values.organisation}` : ""}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch {
    return {
      status: "error",
      message: `Sorry, the message couldn't be sent. Please email ${site.email} directly; your message is still in the box below.`,
      values,
    };
  }

  return { status: "sent", message: "Thanks. Your message has been sent. I'll reply within two working days." };
}
