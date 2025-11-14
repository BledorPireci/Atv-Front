# Responsive Design System Documentation

## Overview

This document describes the comprehensive responsive design system implemented for the ATV Rent application.

## Container System

### Base Container

The `.container` class provides consistent spacing and max-width across all pages:

- **Max Width**: 1280px
- **Mobile Padding**: 20px (< 768px)
- **Tablet Padding**: 32px (768px - 1280px)
- **Desktop Padding**: 40px (> 1280px)

### Container Variants

- `.container--narrow`: 960px max-width
- `.container--wide`: 1440px max-width
- `.container--full`: 100% width

### Usage

```jsx
<div className="container">{/* Your content */}</div>
```

## Breakpoints

The system uses consistent breakpoints defined in `_variables.scss`:

- **xs**: 480px (Mobile phones)
- **sm**: 640px (Large phones)
- **md**: 768px (Tablets)
- **lg**: 1024px (Small laptops)
- **xl**: 1280px (Desktops)
- **2xl**: 1536px (Large screens)

## Responsive Features by Section

### Hero Section

- Full viewport height on desktop
- Reduced padding on mobile
- Container-based content width
- Responsive typography using clamp()

### Fleet Section

- 3 columns on desktop (>1024px)
- 2 columns on tablet (768px-1024px)
- 1 column on mobile (<768px)
- Cards scale responsively

### WhyUs Section

- 2-column layout on desktop
- Stacks to single column on tablet
- Image and content responsively sized

### Gallery Section

- 3 columns on desktop
- 2 columns on tablet
- 2 columns on mobile (optimized for smaller screens)
- Proper img tags with lazy loading

### Footer

- 3-column grid on desktop
- Single column on mobile
- Centered content on small screens

### Contact Page

- 2-column layout on desktop
- Single column on tablet/mobile
- Stats stack vertically on mobile
- CTA buttons full-width on mobile

### ATVs Detail Page

- Side-by-side layout on desktop
- Stacked layout on mobile
- Responsive pricing display
- 2-column specs on desktop, 1 column on mobile

### Terms Page

- Readable content width
- Properly spaced sections
- Responsive padding

## Typography System

All headings and text use responsive sizing with `clamp()`:

```scss
// Example
h1 {
  font-size: clamp(32px, 5vw, 48px);
}
```

This ensures text scales smoothly between mobile and desktop without hard breakpoints.

## Mobile Navigation

The header includes a fully functional mobile menu:

- Hamburger icon appears below 1024px
- Slide-in navigation from left
- Overlay backdrop
- Close on link click or overlay click

## Touch Targets

All interactive elements meet the minimum touch target size of 44x44px on mobile devices.

## Best Practices

### When Adding New Sections

1. Always wrap content in `.container`
2. Use the defined breakpoints from `_variables.scss`
3. Test on mobile, tablet, and desktop
4. Use `clamp()` for fluid typography
5. Ensure touch targets are adequate

### Spacing

Use the predefined spacing scale from `_variables.scss`:

- $spacing-xs: 8px
- $spacing-sm: 16px
- $spacing-md: 24px
- $spacing-lg: 32px
- $spacing-xl: 48px
- $spacing-2xl: 64px
- $spacing-3xl: 80px
- $spacing-4xl: 100px

### Media Queries

Always write mobile-first CSS when possible, or use max-width queries consistently:

```scss
// Desktop styles
.element {
  padding: 64px 0;
}

// Tablet
@media (max-width: 768px) {
  .element {
    padding: 48px 0;
  }
}

// Mobile
@media (max-width: 480px) {
  .element {
    padding: 32px 0;
  }
}
```

## Files Changed

### New Base Files

- `src/styles/base/_reset.scss` - CSS reset
- `src/styles/base/_variables.scss` - Design tokens
- `src/styles/base/_containers.scss` - Container system
- `src/styles/base/_typography.scss` - Typography system
- `src/styles/base/_utilities.scss` - Utility classes

### Updated Component Files

- `src/pages/Home/sections/Hero.scss` - Enhanced responsive styles
- `src/pages/Home/sections/Fleet.scss` - Full responsive grid
- `src/pages/Home/sections/WhyUs.scss` - Mobile-friendly layout
- `src/pages/Home/sections/WhyUs.jsx` - Removed Tailwind classes
- `src/pages/Home/sections/Gallery.scss` - Improved responsive grid
- `src/pages/Home/sections/Gallery.jsx` - Proper img tags
- `src/shared/Header.scss` - Existing mobile menu styles
- `src/shared/Header.jsx` - Mobile menu implementation
- `src/shared/Footer.scss` - Enhanced mobile layout
- `src/pages/ATVs/ATVs.scss` - Comprehensive responsive styles
- `src/pages/Contact/Contact.scss` - Enhanced responsive features
- `src/pages/TermsPage/TermsPage.scss` - Mobile-friendly content
- `src/styles/main.css` - Imports all base styles

## Testing

Test the application at these widths:

- 320px (Small mobile)
- 375px (iPhone)
- 768px (iPad portrait)
- 1024px (iPad landscape / Small laptop)
- 1280px (Desktop)
- 1920px (Large desktop)

## Performance

- Images use lazy loading where appropriate
- Container queries prevent layout shifts
- Smooth transitions for better UX
- Touch-friendly interactive elements

## Browser Support

The responsive system supports:

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

## Future Improvements

Potential enhancements:

- Container queries (when better supported)
- Reduced motion preferences
- Dark mode support
- Print stylesheets
