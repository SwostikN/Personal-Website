import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="flex min-h-[60dvh] flex-col justify-center py-20">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 text-5xl font-bold tracking-tight text-ink">This page isn&rsquo;t here.</h1>
      <p className="mt-4 max-w-lg text-lg text-ink-muted">It may have moved, or the link may be mistyped. These are good places to start:</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">Work</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">Contact</ButtonLink>
      </div>
    </Container>
  );
}
