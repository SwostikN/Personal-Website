import { type NextRequest, NextResponse } from "next/server";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";

// Unknown case-study and post slugs get a real 404 status (not a "soft 404"),
// which is what search engines expect.
const known = {
  work: new Set(projects.map((p) => p.slug)),
  writing: new Set(posts.map((p) => p.slug)),
};

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  const set = known[section as keyof typeof known];
  if (set && slug && !set.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/work/:slug", "/writing/:slug"] };
