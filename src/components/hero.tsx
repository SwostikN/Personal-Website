import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";
import { Container } from "./ui";

// Hero, modelled on the reference layout (Landing Page 2): a greeting, an oversized
// name with one flag-blue letter, a two-line strapline, one square button, and a
// contact strip with hairline dividers. On the right, a photo from the CAICE 2026 talk
// that fades in from the left and runs towards the page edge on wide screens.

export function Hero() {
  const [first] = site.name.split(" ");
  return (
    <div className="overflow-x-clip">
      <Container className="grid items-center gap-8 pt-4 pb-16 sm:pt-8 lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-[1.08fr_1fr] lg:gap-6 lg:pb-12">
        <div className="order-2 flex flex-col lg:order-1">
          <p className="text-xl font-medium text-ink sm:text-2xl">Hi there,</p>
          <h1 className="mt-1 text-[3.6rem] leading-[0.98] font-extrabold tracking-[-0.055em] text-ink sm:text-[5.2rem] xl:text-[6.4rem]">
            I am <AccentI word={first} />
            <span className="sr-only"> Nepal, {site.jobTitle}</span>
          </h1>
          <p className="mt-3 text-[1.75rem] leading-[1.08] font-bold tracking-[-0.045em] text-ink sm:text-[2.4rem] xl:text-[2.75rem]">
            I build systems by day
          </p>
          <p className="mt-2 text-[1.35rem] leading-tight font-semibold tracking-[-0.03em] text-ink sm:text-[1.75rem] xl:text-[2rem]">
            &amp; civic tech for Nepal by night.
          </p>
  
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            System Analyst who turns how organisations really work into reliable software: ERP and payments, public platforms,
            and tools that make public information easier to use.
          </p>
  
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              href="/work"
              className="group inline-flex min-h-[3.6rem] items-center gap-2 bg-accent px-10 text-lg font-semibold tracking-tight text-white transition-colors hover:bg-ink"
            >
              View my work
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/research" className="font-semibold text-ink underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent">
              Read the research
            </Link>
            <Link href="/cv" className="font-semibold text-ink underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent">
              View CV
            </Link>
          </div>
  
          <dl className="mt-12 grid max-w-3xl gap-6 sm:grid-cols-[auto_auto_auto] sm:justify-start sm:gap-0 sm:divide-x sm:divide-line lg:mt-14">
            <div className="sm:pr-7">
              <dt className="text-lg font-bold tracking-tight text-ink">Email</dt>
              <dd className="mt-1 text-ink-muted">
                <a href={`mailto:${site.email}`} className="hover:text-accent">{site.email}</a>
              </dd>
            </div>
            <div className="sm:px-7">
              <dt className="text-lg font-bold tracking-tight text-ink">Location</dt>
              <dd className="mt-1 text-ink-muted">{site.location.city}, {site.location.country}</dd>
            </div>
            <div className="sm:pl-7">
              <dt className="text-lg font-bold tracking-tight text-ink">Currently</dt>
              <dd className="mt-1 text-ink-muted">SAP B1 Consultant,<br />Saurabh Group</dd>
            </div>
          </dl>
        </div>
  
        <HeroArt />
      </Container>
    </div>
  );
}

/** Colours the first "i" in the accent colour, the one accent letter from the reference design. */
function AccentI({ word }: { word: string }) {
  const i = word.indexOf("i");
  if (i < 0) return <>{word}</>;
  return (
    <>
      {word.slice(0, i)}
      <span className="text-secondary">i</span>
      {word.slice(i + 1)}
    </>
  );
}

function HeroArt() {
  return (
    <div className="@container relative order-1 mx-auto aspect-[5/6] w-full max-w-[20rem] sm:max-w-[26rem] lg:order-2 lg:max-w-[36rem]">
      {/* On wide screens the photo bleeds past the column and fades in from the left */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl lg:top-[-6cqw] lg:left-[-4cqw] lg:h-[128cqw] lg:w-[124cqw] lg:rounded-none lg:[mask-image:linear-gradient(to_right,transparent_0,black_30%)]">
        <Image
          src="/images/caice-2026-speaking.jpg"
          alt="Swostik Nepal presenting the uncertainty index for Nepal at CAICE 2026, Marriott Kathmandu"
          fill
          preload
          sizes="(min-width: 1024px) 44rem, (min-width: 640px) 26rem, 20rem"
          className="object-cover object-[30%_30%]"
        />
      </div>
    </div>
  );
}
