"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Click-to-play: the third-party player (and its cookies) only loads after the visitor
 * asks for it. Until then it's a light, branded preview card.
 */
export function EmbedFacade({ src, title, platform, poster }: { src: string; title: string; platform: string; poster: string }) {
  const [on, setOn] = useState(false);
  if (on) {
    return (
      <iframe
        src={src}
        title={`${platform} video: ${title}`}
        className="h-[560px] w-full"
        allow="autoplay; encrypted-media; picture-in-picture"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setOn(true)}
      className="group relative flex h-[560px] w-full flex-col items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#F3F7FF,#DCE8FF)] text-left"
      aria-label={`Play on ${platform}: ${title}`}
    >
      <div className="relative w-40 rotate-[-4deg] overflow-hidden rounded-md shadow-[0_24px_50px_-20px_rgba(15,23,42,0.45)] transition-transform duration-500 group-hover:rotate-0">
        <Image src={poster} alt="" width={320} height={456} className="h-auto w-full" />
      </div>
      <span className="mt-8 flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-colors group-hover:bg-ink">
        <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        Play video
      </span>
      <span className="mt-3 text-xs text-ink-muted">Loads {platform}&rsquo;s player</span>
    </button>
  );
}
