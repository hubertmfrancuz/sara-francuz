# Color System

## Overview

This project uses a custom color palette with two main color scales: **Yellow** and **Graphite**.

## Color Scales

### Yellow Scale

| Shade | Hex Code | CSS Variable | Tailwind Classes |
|-------|----------|--------------|------------------|
| 100 | `#FEFEEC` | `var(--color-yellow-100)` | `bg-yellow-100` `text-yellow-100` `border-yellow-100` |
| 200 | `#F9F8F1` | `var(--color-yellow-200)` | `bg-yellow-200` `text-yellow-200` `border-yellow-200` |
| 300 | `#F3F1E2` | `var(--color-yellow-300)` | `bg-yellow-300` `text-yellow-300` `border-yellow-300` |
| 400 | `#EEEAD3` | `var(--color-yellow-400)` | `bg-yellow-400` `text-yellow-400` `border-yellow-400` |
| 500 | `#E8E3C5` | `var(--color-yellow-500)` | `bg-yellow-500` `text-yellow-500` `border-yellow-500` |
| 600 | `#AEAA94` | `var(--color-yellow-600)` | `bg-yellow-600` `text-yellow-600` `border-yellow-600` |
| 700 | `#747263` | `var(--color-yellow-700)` | `bg-yellow-700` `text-yellow-700` `border-yellow-700` |
| 800 | `#3A3931` | `var(--color-yellow-800)` | `bg-yellow-800` `text-yellow-800` `border-yellow-800` |

**Usage:** Warm, earthy tones ranging from very light cream (100) to dark charcoal (800).

### Graphite Scale

| Shade | Hex Code | CSS Variable | Tailwind Classes |
|-------|----------|--------------|------------------|
| 100 | `#F9F9F9` | `var(--color-graphite-100)` | `bg-graphite-100` `text-graphite-100` `border-graphite-100` |
| 200 | `#DFE0E0` | `var(--color-graphite-200)` | `bg-graphite-200` `text-graphite-200` `border-graphite-200` |
| 300 | `#BFC1C1` | `var(--color-graphite-300)` | `bg-graphite-300` `text-graphite-300` `border-graphite-300` |
| 400 | `#9FA1A3` | `var(--color-graphite-400)` | `bg-graphite-400` `text-graphite-400` `border-graphite-400` |
| 500 | `#7F8284` | `var(--color-graphite-500)` | `bg-graphite-500` `text-graphite-500` `border-graphite-500` |
| 600 | `#5F6263` | `var(--color-graphite-600)` | `bg-graphite-600` `text-graphite-600` `border-graphite-600` |
| 700 | `#404142` | `var(--color-graphite-700)` | `bg-graphite-700` `text-graphite-700` `border-graphite-700` |
| 800 | `#202121` | `var(--color-graphite-800)` | `bg-graphite-800` `text-graphite-800` `border-graphite-800` |
| 900 | `#060707` | `var(--color-graphite-900)` | `bg-graphite-900` `text-graphite-900` `border-graphite-900` |

**Usage:** Cool, neutral grays ranging from very light (100) to nearly black (900).

## Usage Examples

### Using Tailwind Utility Classes

```jsx
// Background colors
<div className="bg-yellow-100">Light cream background</div>
<div className="bg-graphite-800">Dark gray background</div>

// Text colors
<h1 className="text-graphite-900">Black heading</h1>
<p className="text-yellow-700">Brown text</p>

// Border colors
<div className="border border-yellow-300">Cream border</div>
<button className="border-2 border-graphite-500">Gray border button</button>

// Hover states
<button className="bg-yellow-200 hover:bg-yellow-300">
  Hover to darken
</button>

// Combining colors
<div className="bg-yellow-100 text-graphite-800 border border-graphite-300">
  Mixed color card
</div>
```

### Using CSS Variables

For custom styles or inline usage:

```jsx
// Inline styles
<div style={{ backgroundColor: 'var(--color-yellow-100)' }}>
  Custom background
</div>

// In custom CSS
.custom-class {
  background-color: var(--color-yellow-300);
  color: var(--color-graphite-800);
  border: 1px solid var(--color-graphite-300);
}

// With gradients
<div style={{
  background: `linear-gradient(to right, var(--color-yellow-100), var(--color-yellow-300))`
}}>
  Gradient background
</div>
```

## Common Combinations

### Light Theme
```jsx
<div className="bg-yellow-100 text-graphite-900">
  Light background with dark text
</div>
```

### Dark Theme
```jsx
<div className="bg-graphite-900 text-yellow-100">
  Dark background with light text
</div>
```

### Card with Border
```jsx
<div className="bg-yellow-100 border border-graphite-300 text-graphite-800">
  Card content
</div>
```

### Button Variants
```jsx
// Primary
<button className="bg-graphite-900 text-yellow-100 hover:bg-graphite-800">
  Primary Button
</button>

// Secondary
<button className="bg-yellow-200 text-graphite-900 hover:bg-yellow-300">
  Secondary Button
</button>

// Outline
<button className="border border-graphite-800 text-graphite-800 hover:bg-graphite-800 hover:text-yellow-100">
  Outline Button
</button>
```

## Color Palette Guidelines

### When to Use Yellow Scale
- Warm backgrounds
- Accent elements
- Highlights and featured content
- Creating warmth and comfort

### When to Use Graphite Scale
- Text content (darker shades)
- Neutral backgrounds
- Borders and dividers
- Professional, clean aesthetics

## Accessibility

### Text Contrast Recommendations

**For body text:**
- Use `text-graphite-800` or `text-graphite-900` on light backgrounds
- Use `text-yellow-100` or `text-yellow-200` on dark backgrounds

**For headings:**
- Use `text-graphite-900` for maximum contrast on light backgrounds
- Avoid using mid-tone colors (400-600) for text on similar mid-tone backgrounds

**High Contrast Combinations:**
- ✅ `bg-yellow-100` + `text-graphite-900`
- ✅ `bg-graphite-900` + `text-yellow-100`
- ✅ `bg-yellow-200` + `text-graphite-800`
- ❌ `bg-yellow-400` + `text-yellow-600` (low contrast)
- ❌ `bg-graphite-400` + `text-graphite-600` (low contrast)

## Implementation Details

All colors are defined in `app/globals.css` within the `@theme inline` block, making them available as:
1. CSS custom properties (e.g., `var(--color-yellow-100)`)
2. Tailwind utility classes (e.g., `bg-yellow-100`, `text-graphite-900`)

This dual approach provides maximum flexibility for styling throughout the application.
