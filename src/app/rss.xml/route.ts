import { getPosts, site } from "@/lib/content";
import { rfc822 } from "@/lib/format";
import { absolute } from "@/lib/seo";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Built only from imported content, and never reads the request, so it prerenders.
export async function GET() {
  const posts = getPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absolute(`/writing/${p.slug}`)}</link>
      <guid isPermaLink="true">${absolute(`/writing/${p.slug}`)}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.description)}</description>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)}: Writing</title>
    <link>${absolute("/writing")}</link>
    <atom:link href="${absolute("/rss.xml")}" rel="self" type="application/rss+xml" />
    <description>${esc("Notes on systems, requirements, ERP and AI from " + site.name + ".")}</description>
    <language>en</language>
${posts[0] ? `    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
