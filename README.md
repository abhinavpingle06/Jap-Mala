# Virtual Jap Mala

A calm, modern landing page for a meditation-first app built with Next.js App Router.

This project is a lightweight UI prototype for a digital jap mala experience centered on mindfulness, soft motion, glassmorphism, and a peaceful dark theme.

## Features

- Responsive landing page built with App Router and TypeScript
- Clean modern design with dark background, saffron glow accents, and glassmorphism
- Animated hero and feature sections using `framer-motion`
- Reusable UI components for navbar, hero visual, feature cards, and mobile preview
- Ambient experience section with offline-friendly product messaging
- Minimal footer and subtle background glow effects

## Tech Stack

- [Next.js](https://nextjs.org) 16.2
- TypeScript
- Tailwind CSS 4
- `framer-motion`
- `lucide-react`
- Google font via `next/font`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser at:

```bash
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

- `app/page.tsx` — landing page composition and responsive layout
- `app/layout.tsx` — root layout, metadata, and global body theme
- `app/globals.css` — dark theme base, gradients, and global styles
- `components/` — reusable UI pieces:
  - `Navbar.tsx`
  - `HeroVisual.tsx`
  - `FeatureCard.tsx`
  - `MobilePreview.tsx`
  - `SectionHeading.tsx`
- `lib/siteData.ts` — shared navigation and feature data

## Notes

- No backend or real chanting functionality is included yet.
- The UI is designed to remain minimal, calming, and distraction-free.
- Animations are intentionally subtle to keep the experience premium.

## Deployment

This project can be deployed to Vercel or any platform that supports Next.js apps.

## PWA and Offline Support

- The app is configured as a Progressive Web App using `next-pwa`.
- `public/manifest.json` and `public/icons/` provide install metadata and icon references.
- A service worker caches static pages, assets, and the manifest so the landing page,
  login page, and signup page work offline after initial load.
- To test the PWA locally, run:

```bash
npm run build
npm start
```

Then open the app in Chrome, inspect the Application tab, and verify the service worker is registered.

## License

This repository is currently unlicensed. Add a license file if you want to publish or share the project publicly.
