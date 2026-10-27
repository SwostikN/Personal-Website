# swostiknepal: portfolio

Personal site of **Swostik Nepal**, System Analyst & SAP Business One Consultant, Kathmandu. Live at **https://swostikn.com.np**.

Pushing to `main` deploys to production automatically (Vercel, connected to this repository).

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4. Every page, share image, the sitemap, robots.txt and the RSS feed are prerendered at build time.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

Copy `.env.example` to `.env.local` and fill in what you need. Everything is optional; the site works without any of it.

## Where things live

| Path | What |
|---|---|
| `src/content/` | All content: site settings, experience, education, publication, projects (one file each), posts |
| `src/lib/content.ts` | The single read path for content. Pages never import `src/content` directly, so the source can move to a CMS without touching pages |
| `src/lib/seo.tsx` | Page metadata helper and JSON-LD builders (Person, WebSite, ProfilePage, CreativeWork, BlogPosting, ScholarlyArticle, BreadcrumbList) |
| `src/components/blocks.tsx` | Renders case-study content: requirements tables, process flows, layer diagrams, acceptance criteria |
| `src/app/**/opengraph-image.tsx` | Generated social-share images |
| `src/proxy.ts` | Real 404s for unknown project and post slugs |
| `public/swostik-nepal-cv.pdf` | The CV PDF, printed from `/cv` (see below) |

## Updating the CV PDF

The `/cv` page renders from the same data as the rest of the site. After changing content:

```bash
npm run build && npm start   # in one terminal
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/swostik-nepal-cv.pdf http://localhost:3000/cv
```

## Domain: swostikn.com.np

Registered at register.com.np, whose "Edit DNS" screen only sets nameservers. Point them at Vercel:

1. Deploy (`npx vercel --prod`), then in the Vercel project: **Settings → Domains → Add** `swostikn.com.np` and `www.swostikn.com.np` (redirect `www` to the bare domain).
2. register.com.np → **Edit DNS** → Primary `ns1.vercel-dns.com`, Secondary `ns2.vercel-dns.com`. Changes can take up to a day to be approved and propagate.
3. Vercel issues the HTTPS certificate automatically once the nameservers resolve.

## SEO checklist after deploying

1. `NEXT_PUBLIC_SITE_URL` defaults to https://swostikn.com.np; only set it if the domain changes (canonical URLs, sitemap and JSON-LD all use it).
2. Google Search Console → add the domain → paste the verification code into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` → submit `/sitemap.xml`.
3. Bing Webmaster Tools → import from Search Console (or set `NEXT_PUBLIC_BING_SITE_VERIFICATION`).
4. Put the site URL on GitHub, LinkedIn and the CV, so search engines connect them to the same person.

## IndexNow (Bing, Yandex, Seznam…)

Key file: `public/a7fa66e9c783118273a40631fcaa1ef3.txt`. After publishing new pages, notify search engines:

```bash
python3 - <<'PY'
import json, re, urllib.request
urls = re.findall(r"<loc>(.*?)</loc>", urllib.request.urlopen("https://swostikn.com.np/sitemap.xml").read().decode())
body = json.dumps({"host": "swostikn.com.np", "key": "a7fa66e9c783118273a40631fcaa1ef3",
  "keyLocation": "https://swostikn.com.np/a7fa66e9c783118273a40631fcaa1ef3.txt", "urlList": urls}).encode()
print(urllib.request.urlopen(urllib.request.Request("https://api.indexnow.org/indexnow", data=body,
  headers={"Content-Type": "application/json; charset=utf-8"})).status)
PY
```
