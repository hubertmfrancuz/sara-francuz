# Spacing System

## Overview

This project uses a custom spacing scale with 10 levels, designed for consistent spacing throughout the interface.

## Spacing Scale

| Name | Value (px) | CSS Variable | Tailwind Classes |
|------|-----------|--------------|------------------|
| 100  | 4px       | `var(--spacing-100)` | `p-100` `m-100` `gap-100` `space-x-100` etc. |
| 200  | 8px       | `var(--spacing-200)` | `p-200` `m-200` `gap-200` `space-x-200` etc. |
| 300  | 12px      | `var(--spacing-300)` | `p-300` `m-300` `gap-300` `space-x-300` etc. |
| 400  | 16px      | `var(--spacing-400)` | `p-400` `m-400` `gap-400` `space-x-400` etc. |
| 500  | 24px      | `var(--spacing-500)` | `p-500` `m-500` `gap-500` `space-x-500` etc. |
| 600  | 32px      | `var(--spacing-600)` | `p-600` `m-600` `gap-600` `space-x-600` etc. |
| 700  | 40px      | `var(--spacing-700)` | `p-700` `m-700` `gap-700` `space-x-700` etc. |
| 800  | 48px      | `var(--spacing-800)` | `p-800` `m-800` `gap-800` `space-x-800` etc. |
| 900  | 56px      | `var(--spacing-900)` | `p-900` `m-900` `gap-900` `space-x-900` etc. |
| 1000 | 64px      | `var(--spacing-1000)` | `p-1000` `m-1000` `gap-1000` `space-x-1000` etc. |

## Usage Examples

### Padding

```jsx
// All sides
<div className="p-400">16px padding all sides</div>
<div className="p-600">32px padding all sides</div>

// Individual sides
<div className="pt-300 pb-500">12px top, 24px bottom</div>
<div className="px-400 py-200">16px horizontal, 8px vertical</div>
<div className="pl-600 pr-800">32px left, 48px right</div>

// Single side
<div className="pt-100">4px padding top</div>
<div className="pb-900">56px padding bottom</div>
<div className="pl-500">24px padding left</div>
<div className="pr-700">40px padding right</div>
```

### Margin

```jsx
// All sides
<div className="m-300">12px margin all sides</div>
<div className="m-500">24px margin all sides</div>

// Individual sides
<div className="mt-400 mb-600">16px top, 32px bottom</div>
<div className="mx-600 my-300">32px horizontal, 12px vertical</div>

// Auto centering
<div className="mx-auto">Centered horizontally</div>

// Negative margins
<div className="-mt-200">-8px margin top</div>
<div className="-ml-400">-16px margin left</div>
```

### Gap (for Flexbox & Grid)

```jsx
// Flex gap
<div className="flex gap-300">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Grid gap
<div className="grid grid-cols-3 gap-500">
  <div>Cell 1</div>
  <div>Cell 2</div>
  <div>Cell 3</div>
</div>

// Row and column gaps
<div className="grid gap-x-400 gap-y-600">
  Grid with different horizontal and vertical gaps
</div>
```

### Space Between (for Flexbox children)

```jsx
// Horizontal space between
<div className="flex space-x-400">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Vertical space between
<div className="flex flex-col space-y-300">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Width & Height

```jsx
// Fixed width
<div className="w-600">32px width</div>
<div className="w-1000">64px width</div>

// Fixed height
<div className="h-700">40px height</div>
<div className="h-900">56px height</div>

// Min/Max width
<div className="min-w-400">Minimum 16px width</div>
<div className="max-w-800">Maximum 48px width</div>

// Min/Max height
<div className="min-h-500">Minimum 24px height</div>
<div className="max-h-1000">Maximum 64px height</div>
```

### Positioning (top, right, bottom, left)

```jsx
// Absolute positioning
<div className="absolute top-200 left-400">
  8px from top, 16px from left
</div>

<div className="absolute bottom-300 right-500">
  12px from bottom, 24px from right
</div>

// Inset (all sides)
<div className="absolute inset-100">4px from all sides</div>
```

### Using CSS Variables

For custom styles:

```jsx
// Inline styles
<div style={{
  padding: 'var(--spacing-500)',
  marginBottom: 'var(--spacing-300)'
}}>
  Custom spacing
</div>

// In custom CSS
.custom-card {
  padding: var(--spacing-600);
  margin-bottom: var(--spacing-400);
  gap: var(--spacing-300);
}

// Complex calculations
<div style={{
  padding: `var(--spacing-400) var(--spacing-600)`
}}>
  16px vertical, 32px horizontal padding
</div>
```

## Common Patterns

### Card Spacing
```jsx
<div className="p-600 m-400 gap-300">
  Card with 32px padding, 16px margin, 12px gap
</div>
```

### Section Spacing
```jsx
<section className="py-800 px-600">
  Section with 48px vertical, 32px horizontal padding
</section>
```

### Grid Layout
```jsx
<div className="grid grid-cols-3 gap-500 p-600">
  Grid with 24px gap and 32px padding
</div>
```

### Flex Layout
```jsx
<div className="flex gap-400 p-500">
  Flex with 16px gap and 24px padding
</div>
```

### Stacked Content
```jsx
<div className="flex flex-col space-y-500">
  <div>Section 1</div>
  <div>Section 2</div>
  <div>Section 3</div>
</div>
```

## Spacing Guidelines

### When to Use Each Size

- **100 (4px)**: Minimal spacing, tight layouts, icon spacing
- **200 (8px)**: Small gaps, compact UI elements
- **300 (12px)**: Default small spacing, between related elements
- **400 (16px)**: Standard spacing, between UI elements
- **500 (24px)**: Medium spacing, between sections within components
- **600 (32px)**: Larger spacing, between major UI sections
- **700 (40px)**: Section spacing, between distinct content areas
- **800 (48px)**: Large section spacing, page margins
- **900 (56px)**: Extra large spacing, between major page sections
- **1000 (64px)**: Maximum spacing, major layout separations

### Consistency Tips

1. **Related elements**: Use 200-400 for spacing between related elements
2. **Sections**: Use 600-800 for spacing between major sections
3. **Page layout**: Use 800-1000 for outer page margins and major separations
4. **Vertical rhythm**: Stick to consistent vertical spacing (e.g., 500 for all section gaps)
5. **Grid/Flex gaps**: Typically use 300-600 depending on content density

## Responsive Spacing

You can combine with Tailwind's responsive prefixes:

```jsx
<div className="p-300 md:p-500 lg:p-700">
  Responsive padding: 12px mobile, 24px tablet, 40px desktop
</div>

<div className="gap-300 lg:gap-600">
  Responsive gap: 12px mobile, 32px desktop
</div>

<div className="mt-400 lg:mt-800">
  Responsive margin top: 16px mobile, 48px desktop
</div>
```

## Implementation Details

All spacing values are defined in `app/globals.css` within the `@theme inline` block as CSS custom properties, automatically generating Tailwind utility classes for:
- Padding (`p-*`, `px-*`, `py-*`, `pt-*`, `pr-*`, `pb-*`, `pl-*`)
- Margin (`m-*`, `mx-*`, `my-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`)
- Gap (`gap-*`, `gap-x-*`, `gap-y-*`)
- Space (`space-x-*`, `space-y-*`)
- Width (`w-*`, `min-w-*`, `max-w-*`)
- Height (`h-*`, `min-h-*`, `max-h-*`)
- Positioning (`top-*`, `right-*`, `bottom-*`, `left-*`, `inset-*`)
