# Sain-Orshikh Nyambayar's portfolio

Next.js App Router, TypeScript, and Tailwind CSS portfolio at https://www.sain-orshikh.me/.

## Development

Install the locked dependencies with `pnpm install --frozen-lockfile`, start locally with
`pnpm dev`, and verify the production build with `pnpm build`.

## Public identity and discovery

- `src/data/profile.ts` defines the canonical domain, full name, alias, profile description, and GitHub/LinkedIn links.
- `src/data/intro.ts` defines the visible biography. Keep it accurate as studies and interests change.
- The homepage includes ProfilePage/Person JSON-LD matching the public biography.
- `/projects` lists all projects. Each project has a statically generated detail page, using existing descriptions and technologies rather than invented results.
- `/sitemap.xml` contains the homepage, project index, and project details only.
- `/robots.txt` permits crawlers and references the sitemap.
- `/llms.txt` is generated from public profile, biography, experience, and project data at build time. It is a supplementary Markdown summary, not a guarantee of AI discovery or a Google ranking signal. Rebuild/redeploy after content changes.
- `/zlog/*` and `/s3cr3t/*` use `noindex, nofollow`. Authentication still protects admin content; indexing directives are not access controls.

## After deployment

1. Confirm the canonical domain redirects correctly and hosting protections permit search crawlers, including OAI-SearchBot.
2. Verify ownership in Google Search Console and Bing Webmaster Tools. Optional verification tokens are documented in `.env.example`; set them in hosting environment variables before rebuilding.
3. Submit `https://www.sain-orshikh.me/sitemap.xml` and inspect the homepage and project index.
4. Link this portfolio from GitHub and LinkedIn and keep your full name and alias consistent there.
5. Expand selected project descriptions with first-hand technical decisions, contributions, and outcomes when available.

References: https://developers.openai.com/api/docs/bots,
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide,
and https://llmstxt.org/.
