# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing two separate applications:
- **fe/**: Next.js 16 frontend application with React 19, TypeScript, and Tailwind CSS v4
- **studio/**: Sanity CMS v4 content studio for content management

The frontend and CMS are separate but designed to work together, with the frontend consuming content from the Sanity backend.

## Development Commands

### Frontend (fe/)
```bash
cd fe
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Sanity Studio (studio/)
```bash
cd studio
npm run dev      # Start Sanity Studio dev server (default: http://localhost:3333)
npm run build    # Build the studio
npm run deploy   # Deploy studio to Sanity's hosted environment
npm run deploy-graphql  # Deploy GraphQL schema to Sanity
```

## Project Structure

### Frontend Architecture (fe/)
- **Framework**: Next.js 16 with App Router
- **React Version**: 19.2.0 (using new JSX runtime: `react-jsx`)
- **Styling**: Tailwind CSS v4 with PostCSS
- **TypeScript**: Strict mode enabled, module resolution set to "bundler"
- **Path Aliases**: `@/*` maps to the root directory
- **App Structure**:
  - `app/` - App Router pages and layouts
  - `app/layout.tsx` - Root layout component
  - `app/page.tsx` - Home page
  - `app/globals.css` - Global styles with Tailwind directives
  - `public/` - Static assets

### Sanity Studio Architecture (studio/)
- **CMS**: Sanity v4.14.2
- **Project Config**:
  - Project ID: `vs7tkh7i`
  - Dataset: `production`
- **Plugins**:
  - `structureTool` - Content structure management
  - `visionTool` - GraphQL/GROQ query testing
- **Schema**: Define content types in `schemaTypes/` directory
  - Currently empty (`schemaTypes/index.ts` exports empty array)
  - Add new schema types to this array as you build content models
- **Prettier Config**: Semi-colons disabled, single quotes, 100 char width, no bracket spacing

## Key Technical Details

### TypeScript Configuration
- Both projects use ES2017 target with strict mode
- Frontend uses Next.js TypeScript plugin for enhanced type checking
- Studio uses module preservation for Sanity compatibility

### Styling (Frontend)
- Tailwind CSS v4 (latest major version)
- Uses new `@tailwindcss/postcss` plugin
- Global styles in `app/globals.css`

### Content Management Flow
1. Define content schemas in `studio/schemaTypes/`
2. Run Sanity Studio to manage content
3. Query content from frontend using Sanity client (needs to be implemented)

## Working with Schemas

When adding content types to Sanity:
1. Create schema files in `studio/schemaTypes/`
2. Import and add to the `schemaTypes` array in `studio/schemaTypes/index.ts`
3. Schema types follow Sanity's schema definition format
4. After schema changes, consider running `npm run deploy-graphql` to update the GraphQL API

## Deployment

- **Frontend**: Standard Next.js deployment (Vercel recommended)
- **Studio**: Use `npm run deploy` in studio/ to deploy to Sanity's hosted platform
- The Studio can be self-hosted or use Sanity's hosting
