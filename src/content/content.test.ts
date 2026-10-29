// Guards the content files: every link points somewhere real and every file the pages
// reference is actually in /public, so a typo fails the build instead of shipping a 404.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { experience, getPosts, getProjects, publications, site, talks } from "@/lib/content";

const inPublic = (path: string) => existsSync(join(process.cwd(), "public", path));
const projects = getProjects();
const slugs = new Set(projects.map((p) => p.slug));

describe("projects", () => {
  it("have unique slugs", () => expect(slugs.size).toBe(projects.length));

  it("keep SEO titles short enough for search results", () => {
    for (const p of projects) expect(p.seoTitle.length, p.slug).toBeLessThanOrEqual(70);
  });

  it("only list engineering facts that have both an area and a detail", () => {
    for (const p of projects) for (const e of p.engineering ?? []) expect(e.area && e.detail, p.slug).toBeTruthy();
  });

  it("have unique section ids, so the in-page links work", () => {
    for (const p of projects) {
      const ids = p.sections.map((s) => s.id);
      expect(new Set(ids).size, p.slug).toBe(ids.length);
    }
  });
});

describe("internal links", () => {
  it("in Built for point at existing case studies", () => {
    for (const org of site.builtFor) {
      if (org.href.startsWith("http")) continue;
      const slug = org.href.replace(/^\/work\//, "").split("#")[0];
      expect(slugs.has(slug), org.name).toBe(true);
    }
  });

  it("in experience cards point at existing pages", () => {
    for (const e of experience) {
      const href = e.more?.href;
      if (href?.startsWith("/work/")) expect(slugs.has(href.slice(6)), e.organisation).toBe(true);
    }
  });
});

describe("files referenced by the pages exist in /public", () => {
  it("logos", () => {
    for (const e of experience) if (e.logo) expect(inPublic(e.logo), e.logo).toBe(true);
  });

  it("the paper, its cover and every e-paper page", () => {
    for (const p of publications) {
      for (const file of [p.pdf, p.cover].filter(Boolean) as string[]) expect(inPublic(file), file).toBe(true);
      if (p.reader) {
        for (let n = 1; n <= p.reader.pages; n++) {
          const page = `${p.reader.dir}/page-${String(n).padStart(2, "0")}.webp`;
          expect(inPublic(page), page).toBe(true);
        }
      }
    }
  });

  it("talk video, poster and photos", () => {
    for (const t of talks) {
      const files = [t.video?.src, t.video?.poster, ...t.photos.map((p) => p.src)].filter(Boolean) as string[];
      for (const file of files) expect(inPublic(file), file).toBe(true);
    }
  });

  it("the CV download", () => expect(inPublic(site.cvPdf)).toBe(true));
});

describe("posts", () => {
  it("have unique slugs and ISO dates", () => {
    const posts = getPosts();
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    for (const p of posts) expect(p.date, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
