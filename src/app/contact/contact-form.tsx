"use client";

import { useActionState, useEffect, useRef } from "react";
import { type ContactState, sendMessage } from "./actions";

const initial: ContactState = { status: "idle", message: "" };

export function ContactForm({ email }: { email: string }) {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const startedRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) startedRef.current.value = String(Date.now());
  }, []);
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div className="border border-ink bg-surface p-8">
        <p ref={statusRef} tabIndex={-1} role="status" className="text-xl font-semibold text-ink outline-none">{state.message}</p>
      </div>
    );
  }

  const v = state.values;
  const e = state.errors ?? {};
  const field =
    "mt-2 block w-full border bg-canvas px-4 py-3 text-ink placeholder:text-ink-muted/70 focus:border-ink focus:outline-none";

  return (
    <form action={action} noValidate className="space-y-6">
      <p ref={statusRef} tabIndex={-1} aria-live="polite" className={`outline-none ${state.status === "error" ? "border-l-2 border-accent bg-surface p-4 text-ink" : "sr-only"}`}>
        {state.message}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-semibold text-ink">Name</label>
          <input id="name" name="name" autoComplete="name" required defaultValue={v?.name}
            aria-invalid={Boolean(e.name)} aria-describedby={e.name ? "name-error" : undefined}
            className={`${field} ${e.name ? "border-accent" : "border-line"}`} />
          {e.name && <p id="name-error" className="mt-2 text-sm text-accent">{e.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="font-semibold text-ink">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v?.email}
            aria-invalid={Boolean(e.email)} aria-describedby={e.email ? "email-error" : undefined}
            className={`${field} ${e.email ? "border-accent" : "border-line"}`} />
          {e.email && <p id="email-error" className="mt-2 text-sm text-accent">{e.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="organisation" className="font-semibold text-ink">
          Organisation <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <input id="organisation" name="organisation" autoComplete="organization" defaultValue={v?.organisation}
          className={`${field} border-line`} />
      </div>

      <div>
        <label htmlFor="message" className="font-semibold text-ink">Message</label>
        <textarea id="message" name="message" rows={7} required defaultValue={v?.message}
          aria-invalid={Boolean(e.message)} aria-describedby={e.message ? "message-error" : undefined}
          className={`${field} ${e.message ? "border-accent" : "border-line"}`} />
        {e.message && <p id="message-error" className="mt-2 text-sm text-accent">{e.message}</p>}
      </div>

      {/* Spam traps: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <input ref={startedRef} type="hidden" name="started" />

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" disabled={pending} className="inline-flex min-h-12 items-center bg-accent px-8 font-semibold text-white transition-colors hover:bg-ink disabled:opacity-60">
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-ink-muted">
          Or email <a href={`mailto:${email}`} className="text-ink underline underline-offset-4 hover:text-accent">{email}</a>
        </p>
      </div>
    </form>
  );
}
