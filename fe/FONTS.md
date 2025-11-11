# Font Setup Summary

## ✅ Fonts Installed

### Herbik Font Family
- **Location**: `app/fonts/`
- **Files**:
  - `Herbik-Regular.woff2`
  - `Herbik-RegularItalic.woff2`
- **Configuration**: `lib/fonts.ts`
- **Default**: Applied to entire site via body tag

### Cutive Mono
- **Source**: Google Fonts
- **Configuration**: `lib/fonts.ts`
- **Usage**: Monospace text only

## Font Sizes

| Font | Size | Class | Variable | Usage |
|------|------|-------|----------|-------|
| Herbik | 13px | `.text-herbik-sm` | `var(--font-size-herbik-sm)` | Small text, captions |
| Herbik | 18px | `.text-herbik-base` | `var(--font-size-herbik-base)` | Body text |
| Herbik | 21px | `.text-herbik-lg` | `var(--font-size-herbik-lg)` | Sub-headings |
| Herbik | 28px | `.text-herbik-xl` | `var(--font-size-herbik-xl)` | Main headings |
| Cutive Mono | 13px | `.text-cutive` | `var(--font-size-cutive)` | Monospace text |

## Quick Usage Examples

### Simple Text Styling
```jsx
// Large heading
<h1 className="text-herbik-xl">Designer Portfolio</h1>

// Body text (default)
<p className="text-herbik-base">This is body text at 18px</p>

// Small caption
<span className="text-herbik-sm">Small caption text at 13px</span>

// Sub-heading
<h2 className="text-herbik-lg">Sub-heading at 21px</h2>

// Monospace text
<code className="font-cutive text-cutive">Technical info at 13px</code>
```

### With Italic
```jsx
<p className="text-herbik-base italic">Italicized body text</p>
```

### Combining Classes
```jsx
<h1 className="text-herbik-xl italic">
  Italic heading at 28px
</h1>
```

## ⚠️ Important Design Rule

**NEVER use font-weight utilities** (like `font-semibold`, `font-medium`, `font-bold`) anywhere on the site.

See `DESIGN_RULES.md` for details.

## Files Modified

1. **`lib/fonts.ts`** - Font configuration
2. **`app/globals.css`** - CSS variables and utility classes
3. **`app/layout.tsx`** - Font imports and application
4. **`app/fonts/`** - Font files directory

## Default Behavior

- **Body text**: Automatically uses Herbik Regular
- **Font size**: You must explicitly set using the utility classes
- **Italic**: Use the `italic` utility class with Herbik

## For More Details

See `lib/font-usage.md` for comprehensive examples and advanced usage.
