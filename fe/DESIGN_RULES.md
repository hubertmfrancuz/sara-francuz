# Design Rules

## Typography Rules

### ⚠️ IMPORTANT: No Font Weight Modifications

**DO NOT use any font-weight utility classes anywhere on the website.**

This includes:
- `font-thin`
- `font-extralight`
- `font-light`
- `font-normal`
- `font-medium`
- `font-semibold`
- `font-bold`
- `font-extrabold`
- `font-black`

### Reasoning

The Herbik font family is designed with specific weights (Regular 400). Adding font-weight modifications will:
- Break the intended design aesthetic
- Potentially render incorrectly since only Regular weight is available
- Create inconsistency in the visual hierarchy

### What to Use Instead

Typography hierarchy should be achieved through:
- **Font size variations**: Use `.text-herbik-sm`, `.text-herbik-base`, `.text-herbik-lg`, `.text-herbik-xl`
- **Italic emphasis**: Use the `.italic` utility class when needed
- **Spacing and layout**: Use margins, padding, and layout to create visual hierarchy
- **Font family changes**: Switch to `.font-cutive` for monospace emphasis

### Examples

❌ **WRONG:**
```jsx
<h1 className="text-herbik-xl font-bold">Heading</h1>
<p className="text-herbik-base font-medium">Text</p>
<span className="font-semibold">Important</span>
```

✅ **CORRECT:**
```jsx
<h1 className="text-herbik-xl">Heading</h1>
<p className="text-herbik-base">Text</p>
<span className="text-herbik-lg">Important</span>
<span className="text-herbik-base italic">Emphasized</span>
```

### Font Weights Available

- **Herbik**: Regular (400) only
- **Cutive Mono**: Regular (400) only

No bold, semibold, or other weights are available or should be used.
