# Menu System Documentation

## Overview

The site features a responsive header menu with expandable Collections section. Collections are dynamically fetched from Sanity CMS, while main menu items are hardcoded.

## Components

### Header Component (`app/components/Header.tsx`)
- **Location**: Fixed at top of page
- **Width**:
  - Mobile: Full width
  - Desktop: Max 500px, centered
- **States**:
  - **Closed**: "Menu" | "Sara Francuz" | "Cart"
  - **Open**: "Close" | "Sara Francuz" | "Cart"

### Menu Component (`app/components/Menu.tsx`)
- **Display**: Full-screen overlay when open
- **Width**:
  - Mobile: Full width
  - Desktop: Max 500px, centered
- **Menu Items**:
  1. **Collections** (expandable) - Fetched from Sanity
  2. Projects
  3. Shop
  4. About
  5. FAQ
- **Footer**: Contact information (email, Instagram)

## Menu Data Strategy

### Hybrid Approach
1. **Hardcoded Items**: Main menu structure (Collections, Projects, Shop, About, FAQ)
2. **Dynamic Items**: Collection sub-items fetched from Sanity CMS

### Why This Approach?
- ✅ Simple to implement
- ✅ Collections are dynamic content (designer can add/edit)
- ✅ Main navigation is stable and unlikely to change
- ✅ Can migrate to full Sanity menu later if needed

## Sanity Schema

### Collection Document Type
```typescript
{
  title: string          // Collection name (e.g., "Round", "Ghost")
  slug: slug            // URL-friendly slug
  order: number         // Display order in menu
  description?: text    // Optional description
}
```

**Location**: `studio/schemaTypes/collection.ts`

## Usage in Sanity Studio

### Adding a New Collection
1. Go to http://localhost:3333
2. Click "Collection" in the content types
3. Click "Create"
4. Fill in:
   - **Title**: Collection name
   - **Slug**: Auto-generated from title (or customize)
   - **Display Order**: Number (lower = appears first)
   - **Description**: Optional text
5. Click "Publish"

The collection will automatically appear in the menu Collections dropdown.

## Styling

### Design System Usage
- **Fonts**: Herbik (regular & italic)
- **Font Sizes**:
  - Header: `.text-herbik-sm` (13px)
  - Menu items: `.text-herbik-lg` (21px) italic
  - Sub-items: `.text-herbik-base` (18px)
  - Contact: `.text-herbik-sm` (13px)
- **Colors**:
  - Background: `bg-yellow-100`
  - Text: `text-graphite-900` (default)
  - Borders: `border-graphite-900`
- **Spacing**:
  - Padding: Uses spacing scale (300-600)
  - Gaps: Consistent with design system

### Menu Item States
- **Normal**: Regular text, centered
- **Italic**: All main menu items use italic style
- **Hover**: Can be customized (currently none)
- **Active**: Can be customized to show current page

## Technical Implementation

### Files Modified/Created
1. **`studio/schemaTypes/collection.ts`** - Collection schema
2. **`app/components/Header.tsx`** - Header with menu toggle
3. **`app/components/Menu.tsx`** - Full-screen menu overlay
4. **`lib/queries.ts`** - Added `collectionsQuery`
5. **`lib/types.ts`** - Added `Collection` interface
6. **`app/layout.tsx`** - Integrated Header with collections data

### Data Flow
1. Layout fetches collections from Sanity (`collectionsQuery`)
2. Collections passed to Header component
3. Header passes collections to Menu component
4. Menu displays collections in expandable section

### State Management
- **Menu Open/Close**: `useState` in Header component
- **Collections Expanded**: `useState` in Menu component
- **Client-side**: Both Header and Menu are client components (`'use client'`)

## Future Enhancements

### Phase 1 (Current)
- ✅ Basic menu functionality
- ✅ Collections expandable section
- ✅ Contact footer
- ✅ Responsive design

### Phase 2 (Planned)
- [ ] Add Framer Motion animations
- [ ] Cart functionality
- [ ] Active page indicator
- [ ] Keyboard navigation support

### Phase 3 (Optional)
- [ ] Migrate to full Sanity menu schema
- [ ] Multi-level menu support
- [ ] Menu search functionality

## Animation Notes (Future)

When implementing Framer Motion:
- **Menu Open/Close**: Slide in from top or fade
- **Collections Expand/Collapse**: Smooth height transition
- **Menu Items**: Stagger animation on open

## Accessibility

Current considerations:
- Semantic HTML (`<nav>`, `<button>`, `<a>`)
- Proper ARIA labels (to be added)
- Keyboard navigation (to be enhanced)

## Contact Information

Displayed at bottom of menu:
- **Email**: hello@sarafrancuz.com
- **Instagram**: @sarafrancuz

Update these in `app/components/Menu.tsx` if they change.

## Testing the Menu

1. **Open Menu**: Click "Menu" in header
2. **View Collections**: Click "Collections" to expand
3. **Navigate**: Click any menu item
4. **Close Menu**: Click "Close" or navigate to a page
5. **Add Collection**: Add in Sanity Studio, refresh page to see in menu

## Troubleshooting

**Collections not showing?**
- Check Sanity Studio has collections published
- Verify collections query in dev tools
- Ensure `order` field is set on collections

**Menu not opening?**
- Check browser console for errors
- Verify Header component is in layout
- Check z-index conflicts

**Styling issues?**
- Verify design system classes are loaded
- Check `globals.css` for variables
- Inspect element in browser dev tools
