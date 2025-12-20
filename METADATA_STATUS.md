# SEO Metadata Implementation Status

## Current Status

### ✅ Pages with Metadata
- **Home (`/`)** - Has `generateMetadata()` pulling from Sanity
  - Uses `seo.metaTitle` and `seo.metaDescription` from HomePage
  - Fallback: "Sara Francuz" / "Designer Portfolio"

### ❌ Pages Missing Metadata
- **About (`/about`)** - No metadata
- **FAQ (`/faq`)** - No metadata
- **Shop (`/shop`)** - No metadata
- **Projects (`/projects`)** - No metadata
- **Product Detail (`/shop/[handle]`)** - No metadata
- **Project Detail (`/projects/[handle]`)** - No metadata
- **Collection Detail (`/collections/[handle]`)** - No metadata

### 🔧 Root Layout
- Has static metadata: `title: "Sara Francuz"`, `description: "Designer Portfolio"`
- This serves as fallback for pages without metadata

## Schema Analysis

### Sanity Schema with SEO Support
Currently only `homePage` has SEO fields:
```typescript
{
  seo: {
    metaTitle: string
    metaDescription: string
  }
}
```

### Missing SEO in Other Schemas
These document types need SEO fields added:
- ❌ `aboutPage` - No SEO object
- ❌ `faqPage` - No SEO object
- ❌ `product` - No SEO fields
- ❌ `project` - No SEO fields
- ❌ `collection` - No SEO fields

## Recommended Implementation

### Phase 1: Add Basic Metadata (No Schema Changes)

Add `generateMetadata()` to all pages using existing data:

**About Page:**
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About - Sara Francuz",
    description: "Learn more about Sara Francuz and her work"
  }
}
```

**FAQ Page:**
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQ - Sara Francuz",
    description: "Frequently asked questions about Sara Francuz"
  }
}
```

**Shop Page:**
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Shop - Sara Francuz",
    description: "Browse our collection of products"
  }
}
```

**Projects Page:**
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects - Sara Francuz",
    description: "Explore our design projects"
  }
}
```

**Product Detail:**
```typescript
export async function generateMetadata({
  params,
}: {
  params: { handle: string }
}): Promise<Metadata> {
  const product = await client.fetch(productQuery, { handle: params.handle })

  return {
    title: `${product.title} - Sara Francuz`,
    description: product.description || `${product.title} by Sara Francuz`
  }
}
```

**Project Detail:**
```typescript
export async function generateMetadata({
  params,
}: {
  params: { handle: string }
}): Promise<Metadata> {
  const project = await client.fetch(projectQuery, { handle: params.handle })

  return {
    title: `${project.title} - Sara Francuz`,
    description: project.description || `${project.title} project by Sara Francuz`
  }
}
```

**Collection Detail:**
```typescript
export async function generateMetadata({
  params,
}: {
  params: { handle: string }
}): Promise<Metadata> {
  const collection = await client.fetch(collectionQuery, { slug: params.handle })

  return {
    title: `${collection.title} Collection - Sara Francuz`,
    description: `Browse the ${collection.title} collection`
  }
}
```

### Phase 2: Add SEO Schema to Sanity (Future Enhancement)

Add SEO object to other schemas:

```typescript
// In product.ts, project.ts, etc.
defineField({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Custom page title for search engines (defaults to product/project title)'
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Short description for search engines (150-160 characters recommended)'
    }
  ]
})
```

Then update queries to include `seo` field and use in `generateMetadata()`.

## Benefits of Adding Metadata

### SEO Improvements
- ✅ Custom titles for each page
- ✅ Unique descriptions for better search rankings
- ✅ Social media sharing preview control
- ✅ Better crawling and indexing

### User Experience
- ✅ Accurate browser tab titles
- ✅ Meaningful bookmark names
- ✅ Better navigation clarity

## Open Graph & Twitter Cards (Future)

Can be added to metadata:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sara Francuz",
    description: "Designer Portfolio",
    openGraph: {
      title: "Sara Francuz",
      description: "Designer Portfolio",
      images: ['/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Sara Francuz",
      description: "Designer Portfolio",
      images: ['/og-image.jpg'],
    },
  }
}
```

## Priority Actions

### Quick Wins (10-15 minutes)
1. Add basic `generateMetadata()` to all 7 missing pages
2. Use product/project title and description for dynamic pages
3. Test metadata appears in browser tabs and search results

### Full Implementation (1-2 hours)
1. Add SEO schema object to all Sanity document types
2. Update queries to fetch SEO data
3. Update `generateMetadata()` to use Sanity SEO fields with fallbacks
4. Add Open Graph and Twitter card metadata
5. Test with social media preview tools
