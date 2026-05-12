# Chinese Zodiac

> Enter your birth year. Get your Chinese zodiac sign, the traits behind it, and a quick read on what that animal means.

**Live demo:** [chinese-zodiac-seven.vercel.app](https://chinese-zodiac-seven.vercel.app)

---

## Why this exists

The Chinese zodiac is one of the oldest personality frameworks still in daily use, and most online "what's your sign?" tools wrap it in ads, popups, and SEO sludge. I wanted a clean, fast, single-purpose page: type a year, get a thoughtful answer.

It's also a small playground for me to stay sharp on Next.js and the modern React server component model between larger projects.

---

## Features

- **Year → sign** lookup with accurate lunar-new-year boundary handling
- **Trait breakdown** for each of the 12 animals (Rat through Pig)
- **Element pairing** (Wood / Fire / Earth / Metal / Water) for the 60-year cycle
- Clean, mobile-first layout — no ads, no popups, no tracking

---

## Stack

| Layer    | Tech                                  |
|----------|---------------------------------------|
| Framework| Next.js 16 (App Router)               |
| UI       | React 19, Tailwind CSS v4, TypeScript |
| Hosting  | Vercel                                |

---

## Local development

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

---

## Roadmap

- [ ] Compatibility matrix between two signs
- [ ] Year-of-the-X overview page (e.g. 2026 Year of the Horse)
- [ ] Daily reading rooted in the Chinese almanac
- [ ] Share card (OG image) per sign

---

## About

Built by [Sonny May](https://github.com/sonnymay). One of a small set of focused web tools I ship between larger projects.
