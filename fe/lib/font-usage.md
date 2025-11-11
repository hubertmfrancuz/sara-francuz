# Font Usage Guide

## ⚠️ CRITICAL RULE: No Font Weight Modifications

**NEVER use font-weight utility classes (font-semibold, font-medium, font-bold, etc.) anywhere on the website.**

Only the Regular (400) weight is available. Use font sizes and italic for hierarchy and emphasis instead.

See `DESIGN_RULES.md` for complete details.

---

## Available Fonts

### Herbik (Primary Font)
- **Regular**: Normal text
- **Italic**: Emphasis or special text

### Cutive Mono (Monospace Font)
- Used for special elements, code, or technical information

## Font Sizes

### Herbik Sizes
- **13px** (sm): Small text, captions, labels
- **18px** (base): Body text, standard content
- **21px** (lg): Sub-headings, important text
- **28px** (xl): Main headings, hero text

### Cutive Mono Sizes
- **13px**: Only size used for monospace text

## Usage in Tailwind

### Using Font Families

```jsx
// Herbik (default on body)
<div>This uses Herbik by default</div>

// Herbik explicitly
<div className="font-herbik">Herbik text</div>

// Cutive Mono
<div className="font-cutive">Monospace text</div>

// Herbik Italic (use italic utility)
<div className="italic">Herbik Italic text</div>
```

### Using Font Sizes

You can use the custom font sizes with inline styles or create utility classes:

```jsx
// Method 1: Inline styles
<h1 style={{fontSize: 'var(--font-size-herbik-xl)'}}>28px Heading</h1>
<h2 style={{fontSize: 'var(--font-size-herbik-lg)'}}>21px Sub-heading</h2>
<p style={{fontSize: 'var(--font-size-herbik-base)'}}>18px Body text</p>
<span style={{fontSize: 'var(--font-size-herbik-sm)'}}>13px Small text</span>

// Method 2: Custom CSS classes (recommended - add to globals.css)
<h1 className="text-herbik-xl">28px Heading</h1>
<h2 className="text-herbik-lg">21px Sub-heading</h2>
<p className="text-herbik-base">18px Body text</p>
<span className="text-herbik-sm">13px Small text</span>

// Cutive Mono with size
<code className="font-cutive" style={{fontSize: 'var(--font-size-cutive)'}}>
  Monospace 13px
</code>
```

## Example Combinations

```jsx
// Large heading with Herbik
<h1 className="font-herbik" style={{fontSize: 'var(--font-size-herbik-xl)'}}>
  Designer Portfolio
</h1>

// Body text
<p className="font-herbik" style={{fontSize: 'var(--font-size-herbik-base)'}}>
  Welcome to my portfolio
</p>

// Emphasized text with italic
<span className="font-herbik italic" style={{fontSize: 'var(--font-size-herbik-base)'}}>
  Featured work
</span>

// Technical/code text
<code className="font-cutive" style={{fontSize: 'var(--font-size-cutive)'}}>
  Technical details
</code>
```
