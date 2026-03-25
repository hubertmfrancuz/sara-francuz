# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio and e-commerce site for Sara Francuz (object/spatial designer). Monorepo with two apps:
- **fe/**: Next.js 16 frontend (React 19, TypeScript, Tailwind CSS v4)
- **studio/**: Sanity CMS v4 content studio

## Development Commands

### Frontend (fe/)
```bash
cd fe
npm run dev      # Dev server on http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

### Sanity Studio (studio/)
```bash
cd studio
npm run dev      # Studio on http://localhost:3333
npm run build    # Build studio
npm run deploy   # Deploy to Sanity hosting
npm run deploy-graphql  # Deploy GraphQL schema (run after schema changes)
```

## Architecture

### Data Flow: Sanity -> Frontend
1. Content schemas defined in `studio/schemaTypes/` and registered in `studio/schemaTypes/index.ts`
2. Frontend queries Sanity via `next-sanity` client (`fe/lib/sanity.ts`) using GROQ queries (`fe/lib/queries.ts`)
3. TypeScript interfaces for all Sanity data in `fe/lib/types.ts`
4. Images served via `cdn.sanity.io`, built with `@sanity/image-url` helper (`urlFor()` in `fe/lib/sanity.ts`)

### Environment Variables (fe/)
Required env vars (configured externally, not committed):
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID (`vs7tkh7i`)
- `NEXT_PUBLIC_SANITY_DATASET` — Sanity dataset (`production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` — Sanity API version
- `REVALIDATE_SECRET` — Secret for webhook-based revalidation

### Caching & Revalidation Strategy
- Pages use ISR with `revalidate = 3600` (1 hour) as default
- Layout-level data (collections, contact info) cached for 24 hours
- On-demand revalidation via webhook at `POST /api/revalidate` (authenticated with `REVALIDATE_SECRET`)
- Cache tags per content type: `home-page`, `about-page`, `faq-page`, `products`, `collections`, `collection-detail`, `projects`, `projectCategories`

### Frontend Page Pattern
Pages follow a server/client component split:
- **Server components** (page.tsx): fetch data from Sanity, generate metadata, pass data as props
- **Client components** (*Client.tsx): handle interactivity, filtering, animations
- Example: `fe/app/shop/page.tsx` (server) -> `fe/app/shop/ShopClient.tsx` (client)

### Key Frontend Patterns
- **Animations**: Framer Motion throughout — loading screen, page transitions, fade-in effects
- **Navigation**: Custom `ViewTransitionLink` component wraps Next.js Link with transition overlay
- **Cart**: Client-side only via React Context (`CartContext`), persisted to localStorage
- **Layout**: `ClientLayout` wraps all pages with Header, Footer, Cart drawer, loading screen, and navigation overlay
- **Fonts**: Custom local font "Herbik" (`--font-herbik`) + Google "Cutive Mono" (`--font-cutive-mono`)
- **Maintenance mode**: Toggle via `MAINTENANCE_MODE` flag in `fe/middleware.ts`

### Sanity Schema Types
Document types: `homePage`, `aboutPage`, `faqPage`, `collection`, `product`, `project`, `projectCategory`
Reusable object types: `hero`, `contentBlock`, `featuredCollection`, `imageBlock`, `textBlock`, `featuredCollectionBlock`, `collectionTextBlock`, `collectionImageBlock`

### Adding a New Content Type
1. Create schema file in `studio/schemaTypes/`
2. Import and add to array in `studio/schemaTypes/index.ts`
3. Add GROQ query in `fe/lib/queries.ts`
4. Add TypeScript interface in `fe/lib/types.ts`
5. Add revalidation case in `fe/app/api/revalidate/route.ts`
6. Run `npm run deploy-graphql` in studio/

### Studio Code Style
Prettier: no semicolons, single quotes, 100 char width, no bracket spacing
