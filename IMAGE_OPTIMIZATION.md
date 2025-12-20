# Image Optimization with Sanity LQIP

## What Was Implemented

### 1. Sanity LQIP (Low Quality Image Placeholder)
Sanity automatically generates a tiny base64-encoded preview (LQIP) of every image. This is displayed instantly while the full image loads, creating a smooth blur-up effect.

### 2. Changes Made

**Queries** (`fe/lib/queries.ts`):
- Added `metadata { lqip }` to all image queries
- Now fetches the LQIP data alongside image URLs

**Types** (`fe/lib/types.ts`):
- Updated `SanityImage` interface to include `metadata.lqip`

**ProductCard** (`fe/app/components/ProductCard.tsx`):
- Added `placeholder="blur"` with LQIP data
- Removed custom blur animations (Next.js handles it)
- Images now show blurred preview instantly

**ImageWithFade** (`fe/app/components/ImageWithFade.tsx`):
- Added `lqip` prop
- Automatically uses blur placeholder when LQIP available

**Collection & Project Pages**:
- Updated to pass LQIP data to ImageWithFade components

## How It Works

```
1. User visits page
   ↓
2. Next.js shows tiny blurred LQIP instantly (< 1KB, base64)
   ↓
3. Full image loads in background
   ↓
4. Image fades in smoothly when ready
```

## Benefits

✅ **Instant visual feedback** - Users see something immediately
✅ **No layout shift** - Blur placeholder takes correct space
✅ **Smooth transitions** - Professional blur-up effect
✅ **Zero extra requests** - LQIP embedded in HTML
✅ **Works with lazy loading** - Still efficient

## Performance Impact

**Before:**
- White space → Sharp image appears
- Feels slow even with fast connection

**After:**
- Blurred preview → Sharp image fades in
- Feels instant and professional

## Browser Support

- **Modern browsers**: Full blur effect
- **Older browsers**: Graceful fallback (no blur)
- **No JavaScript**: Still works (SSR)

## Sanity Configuration

No configuration needed! Sanity automatically:
- Generates LQIP for all images on upload
- Stores as tiny base64 string (~20-30 bytes)
- Returns in queries when requested

## Testing

Visit any page with images:
1. Open DevTools → Network tab
2. Throttle to "Slow 3G"
3. Refresh page
4. You should see blurred previews instantly
5. Full images fade in smoothly

## Next.js Image Props

```typescript
<Image
  src={imageUrl}
  placeholder="blur"           // Enable blur effect
  blurDataURL={lqip}          // Sanity's LQIP data
  sizes="(max-width: 768px) 50vw, 33vw"  // Responsive sizing
  className="transition-opacity"  // Smooth fade-in
/>
```

## Troubleshooting

**Images still loading slowly:**
- Check network throttling
- Verify LQIP is in query response
- Check browser console for errors

**No blur effect:**
- Ensure `metadata.lqip` is in Sanity query
- Check `blurDataURL` is being passed
- Verify `placeholder="blur"` is set

**Type errors:**
- Run `npm run build` to check TypeScript
- Ensure types include `metadata?: { lqip?: string }`
