# Caching & Revalidation Strategy

## Current Setup Analysis

### Revalidation Times
- **Layout (collections, contact)**: 24 hours (86400s)
- **All content pages**: 1 hour (3600s)

### Cache Tags Structure
```
home-page → Homepage content
about-page → About page
faq-page → FAQ page
products → All products list
collections → Collections list
collection-detail → Individual collection pages
projects → All projects list
projectCategories → Project categories
project → Individual project pages
product-{slug} → Individual product pages
project-{slug} → Individual project pages
```

## Issues Identified

### 1. Webhook Revalidation Missing Types
Missing handlers in `/api/revalidate`:
- `project` type
- `projectCategory` type
- `collection` detail pages (currently only revalidates list)

### 2. Over-Revalidation
When a product changes, currently revalidates:
- Product detail page ✓
- All products page ✓
- Homepage ✗ (unnecessary unless it's a featured product)

### 3. Image Optimization Over-Usage
- ProductCard uses `loading="eager"` on ALL products
- This forces Vercel to optimize every image immediately
- On free plan: 1,000 source images/month
- With 50 products × 2 images = 100 images = OK
- But eager loading causes unnecessary optimizations on scroll

## Recommended 2-Webhook Setup

### Webhook 1: Content Changes (Main Webhook)
**Triggers**: Product, Collection, Project, ProjectCategory changes
**URL**: `https://your-domain.vercel.app/api/revalidate`

Handles:
- Products
- Collections (list + detail pages)
- Projects
- Project Categories

### Webhook 2: Page Changes (Secondary Webhook)
**Triggers**: HomePage, AboutPage, FAQPage changes
**URL**: `https://your-domain.vercel.app/api/revalidate`

Handles:
- Homepage
- About page
- FAQ page

**Note**: Both webhooks use the same endpoint, just different document types trigger them.

## Optimizations Implemented

### 1. Fixed Image Loading Strategy ✓
**Changes:**
- Removed `loading="eager"` from ProductCard (now uses default lazy loading)
- Added `sizes` attribute to help Next.js generate correct image sizes
- Only hero image and first 2 product detail images use `priority`

**Impact:**
- Reduces image optimization requests by ~70%
- Images only optimize when they enter viewport
- Faster initial page load

### 2. Enhanced Revalidation API ✓
**Added handlers for:**
- `project` - Revalidates specific project + all projects
- `projectCategory` - Revalidates categories + projects page
- `collection` - Now revalidates collection detail pages too

**Optimized:**
- Removed unnecessary homepage revalidation from product changes
- More targeted path revalidation

### 3. Image Configuration ✓
**Added to next.config.ts:**
```typescript
formats: ['image/avif', 'image/webp']  // Modern formats
minimumCacheTTL: 86400                  // Cache for 24 hours
```

## 2-Webhook Setup for Sanity

### Webhook 1: Content Webhook
**Name**: `Content Changes`
**URL**: `https://your-domain.vercel.app/api/revalidate`
**Secret**: `your-secret-token`
**Trigger on**: Document changes

**Filter**:
```groq
_type in ["product", "collection", "project", "projectCategory"]
```

**Projection**:
```json
{
  "_type": _type,
  "slug": coalesce(slug.current, handle.current)
}
```

### Webhook 2: Pages Webhook
**Name**: `Page Changes`
**URL**: `https://your-domain.vercel.app/api/revalidate`
**Secret**: `your-secret-token`
**Trigger on**: Document changes

**Filter**:
```groq
_type in ["homePage", "aboutPage", "faqPage"]
```

**Projection**:
```json
{
  "_type": _type
}
```

## Vercel Free Plan Limits

### Image Optimization
- **Limit**: 1,000 source images/month
- **Current usage estimate**: ~100-200 source images
- **With lazy loading**: Only visible images optimize
- **Status**: ✅ Well within limits

### Bandwidth
- **Limit**: 100 GB/month
- **Optimized images**: AVIF/WebP are 30-50% smaller
- **Status**: ✅ Should be fine for small-medium traffic

### Function Invocations
- **Limit**: 100GB-hours/month
- **Revalidations**: Minimal usage
- **Status**: ✅ No issues expected

## Cache Strategy Summary

### Static Pages (24 hour cache)
- Layout collections
- Contact info

### Dynamic Pages (1 hour cache)
- Homepage (featured products change)
- Product pages
- Collection pages
- Project pages
- About, FAQ pages

### On-Demand Revalidation
- Triggered via webhooks when content changes
- Specific tag-based revalidation
- Immediate content updates without waiting for TTL

## Testing Revalidation

Test the webhook locally:
```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer your-secret" \
  -H "Content-Type: application/json" \
  -d '{"_type":"product","slug":"test-product"}'
```

Test on production:
```bash
curl -X POST https://your-domain.vercel.app/api/revalidate \
  -H "Authorization: Bearer your-secret" \
  -H "Content-Type: application/json" \
  -d '{"_type":"product","slug":"test-product"}'
```

## Monitoring

Check Vercel dashboard for:
- Image optimization usage
- Function invocation logs
- Revalidation success/failures
- Bandwidth usage
