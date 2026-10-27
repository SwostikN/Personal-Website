import Image from "next/image";
import Link from "next/link";
import { portrait, site } from "@/lib/content";
import { PointerParallax } from "./parallax";
import { Container } from "./ui";

// Hero, modelled on the reference layout (Landing Page 2): a greeting, an oversized
// name with one accent-coloured letter, a two-line strapline, one square button, and a
// contact strip with hairline dividers. On the right, an editorial collage: a
// cut-out portrait over a giant serif initial, with blue and
// blush shapes, dots, a hairline half-circle and vertical type. The shapes are
// CSS/SVG sized in container units, so the collage scales as one piece.

export function Hero() {
  const [first] = site.name.split(" ");
  return (
    <Container data-parallax-area className="grid items-center gap-8 pt-4 pb-16 sm:pt-8 lg:min-h-[calc(100dvh-6rem)] lg:grid-cols-[1.08fr_1fr] lg:gap-6 lg:pb-12">
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
  );
}

/** Colours the first "i" in the accent colour, the one accent letter from the reference design. */
function AccentI({ word }: { word: string }) {
  const i = word.indexOf("i");
  if (i < 0) return <>{word}</>;
  return (
    <>
      {word.slice(0, i)}
      <span className="text-accent">i</span>
      {word.slice(i + 1)}
    </>
  );
}

function HeroArt() {
  return (
    <PointerParallax className="@container relative order-1 mx-auto aspect-[5/6] w-full max-w-[20rem] select-none sm:max-w-[26rem] lg:order-2 lg:max-w-[36rem]">
      {/* Layers drift with the pointer by different depths (desktop mouse only). */}
      <div aria-hidden className="parallax-layer pointer-events-none absolute inset-0 [--depth:14px]">
      {/* blue disc behind the head (the flower's place in the reference) */}
      <div aria-hidden className="anim-pop absolute top-[6cqw] left-[6cqw] aspect-square w-[36cqw] rounded-full bg-accent-bright [animation-delay:150ms]" />

      </div>
      <div aria-hidden className="parallax-layer pointer-events-none absolute inset-0 [--depth:5px]">
      {/* the giant serif initial: lower left, starting at shoulder height so it never crosses the face */}
      <span
        aria-hidden
        className="absolute top-[54cqw] left-[-3cqw] font-serif text-[92cqw] leading-[0.74] font-bold text-ink"
      >
        S
      </span>

      </div>
      {/* cut-out portrait, fading out at the bottom and right edge */}
      <div className="absolute top-[-2cqw] right-[-6cqw] aspect-square w-[94cqw] [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,black_80%,transparent_99%),linear-gradient(to_left,transparent_2%,black_16%)]">
        <Image
          src="/images/swostik-nepal-cutout.png"
          alt={portrait.alt}
          fill
          preload
          sizes="(min-width: 1024px) 34rem, (min-width: 640px) 25rem, 19rem"
          className="object-contain object-top"
        />
      </div>

      <div aria-hidden className="parallax-layer pointer-events-none absolute inset-0 [--depth:-10px]">
      {/* sky-blue shard with dots, laid over the initial */}
      <div aria-hidden className="anim-rise absolute bottom-[2cqw] left-[34cqw] [animation-delay:450ms] h-[40cqw] w-[24cqw] bg-[linear-gradient(165deg,var(--color-blush),var(--color-blush-deep))] [clip-path:polygon(28%_0,100%_0,72%_100%,0_100%)]" />
      <svg aria-hidden viewBox="0 0 40 80" className="absolute bottom-[6cqw] left-[40cqw] w-[10cqw] text-accent">
        {[[6, 6], [16, 12], [9, 22], [22, 30], [13, 40], [27, 50], [18, 62], [30, 72]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.1" fill="currentColor" />
        ))}
      </svg>

      {/* black dot near the head */}
      <div aria-hidden className="absolute top-[45cqw] left-[-3cqw] aspect-square w-[3.4cqw] rounded-full bg-ink" />

      {/* hairline half-circle with a dot */}
      <svg aria-hidden viewBox="0 0 60 100" className="absolute right-[0cqw] bottom-[18cqw] w-[13cqw] overflow-visible text-ink" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 4 A 46 46 0 0 1 6 96" />
        <path d="M6 58 V 96" />
        <circle cx="24" cy="34" r="3" fill="currentColor" stroke="none" />
      </svg>

      {/* vertical type, two weights as in the reference */}
      <p aria-hidden className="absolute top-[2cqw] left-[1cqw] flex rotate-180 gap-[0.8cqw] font-sans leading-none text-ink [writing-mode:vertical-rl]">
        <span className="text-[2.05cqw] font-extrabold tracking-[0.14em]">BUILD WHAT LASTS</span>
        <span className="text-[1.55cqw] font-medium tracking-[0.2em]">FROM KATHMANDU</span>
      </p>
      </div>
    </PointerParallax>
  );
}
