"use server";

export type NewsletterState = {
  status: "idle" | "subscribed" | "fallback" | "error";
  message: string;
  email?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Adds the address to the Resend Audience (POST /contacts) when RESEND_API_KEY is set, opted in
 * to the "Notes from the work" topic when RESEND_TOPIC_ID is set. Without a key (or if Resend
 * fails) it returns "fallback", and the form offers a pre-filled email instead, so a sign-up is
 * never silently lost.
 */
export async function subscribe(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);

  // Honeypot: people never see or fill this field.
  if (String(formData.get("company") ?? "")) {
    return { status: "subscribed", message: "Thanks. You're on the list." };
  }
  if (!EMAIL.test(email)) {
    return { status: "error", message: "Please enter a valid email address, like name@example.com.", email };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const topicId = process.env.RESEND_TOPIC_ID;
  if (!apiKey) {
    return { status: "fallback", message: "Sign-ups by form open soon. Send me a quick email and I'll add you now.", email };
  }

  try {
    const res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        ...(topicId ? { topics: [{ id: topicId, subscription: "opt_in" }] } : {}),
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch {
    return { status: "fallback", message: "Sorry, that didn't go through. Send me a quick email and I'll add you.", email };
  }

  return { status: "subscribed", message: "Thanks. You're on the list for Notes from the work." };
}
