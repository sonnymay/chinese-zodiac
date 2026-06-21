# Chinese Zodiac

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=flat-square&logo=vercel&logoColor=white)

Chinese Zodiac is a fast, single-purpose Next.js app for finding a Chinese zodiac animal by birth year or full birth date. It includes animal profiles, element information, compatibility details, and a clean mobile-first interface.

## Live Demo

[chinese-zodiac-seven.vercel.app](https://chinese-zodiac-seven.vercel.app)

## Features

- Year and full-date zodiac lookup, including Chinese New Year boundary handling for supported years
- Profiles for all 12 zodiac animals with traits, elements, yin/yang, lucky colors, numbers, flowers, and gems
- Compatibility calculator between two zodiac signs
- Recent-year lists and browse pages for each animal
- Shareable `?year=` URL state for calculated results
- Responsive layout built for quick use on desktop and mobile

## Tech Stack

| Library | Purpose |
|---|---|
| Next.js 16 | App Router framework and production build |
| React 19 | Interactive UI components |
| TypeScript | Typed zodiac calculation and display logic |
| Tailwind CSS 4 | Styling foundation |
| Vercel | Hosting and deployment |

## What This Code Shows

- Data-driven UI from typed zodiac profile and compatibility modules
- Date parsing and edge-case handling around lunar new year boundaries
- Next.js App Router structure with reusable display components
- SEO-friendly metadata and canonical page setup
- A focused product scope that keeps the app fast and easy to understand

## Getting Started

```bash
git clone https://github.com/sonnymay/chinese-zodiac.git
cd chinese-zodiac
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

