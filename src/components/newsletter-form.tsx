"use client";

import { useActionState } from "react";
import { type NewsletterState, subscribe } from "@/app/newsletter-actions";

const initial: NewsletterState = { status: "idle", message: "" };

export function NewsletterForm({ to }: { to: string }) {
  const [state, action, pending] = useActionState(subscribe, initial);

  if (state.status === "subscribed") {
    return (
      <p role="status" className="mt-6 border-l-2 border-accent bg-white px-5 py-4 font-semibold text-ink">
        {state.message}
      </p>
    );
  }

  const mailto = `mailto:${to}?subject=${encodeURIComponent("Subscribe me to Notes from the work")}&body=${encodeURIComponent(
    `Please add ${state.email ?? "me"} to your newsletter.`,
  )}`;

  return (
    <form action={action} noValidate className="mt-6">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="Your email address"
        defaultValue={state.email}
        aria-invalid={state.status === "error"}
        aria-describedby="newsletter-status"
        className={`block min-h-14 w-full border bg-white px-4 text-ink placeholder:text-ink-muted/80 focus:border-ink focus:outline-none ${
          state.status === "error" ? "border-accent" : "border-[#D5DAE3]"
        }`}
      />
      {/* Spam trap, hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Company <input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-2.5 inline-flex min-h-14 w-full items-center justify-center bg-accent px-6 font-semibold text-white transition-colors hover:bg-ink disabled:opacity-60"
      >
        {pending ? "Subscribing…" : "Subscribe to the newsletter"}
      </button>
      <p id="newsletter-status" aria-live="polite" className="mt-3 text-sm text-ink-muted">
        {state.status === "error" || state.status === "fallback" ? (
          <span className="text-ink">
            {state.message}{" "}
            {state.status === "fallback" && (
              <a href={mailto} className="font-semibold text-accent underline underline-offset-4">Email {to}</a>
            )}
          </span>
        ) : (
          "I'll never share your email."
        )}
      </p>
    </form>
  );
}
