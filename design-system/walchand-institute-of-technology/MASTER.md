# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Walchand Institute of Technology (IIT Madras Design Model)
**Generated:** 2026-06-04 12:43:00
**Category:** Academic / Institutional Portal

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#1d5cab` | `--color-primary` |
| Secondary | `#1E293B` | `--color-secondary` |
| CTA/Accent | `#1d5cab` | `--color-cta` |
| Background | `#FAF7F2` | `--color-background` |
| Text | `#0F172A` | `--color-text` |

**Color Notes:** Prestigious royal blue + warm academic sand background + charcoal slate text

### Typography

- **Heading Font:** Lora
- **Body Font:** Lato
- **Mood:** academic, prestigious, scholarly, readable, institutional
- **Google Fonts:** [Lora + Lato](https://fonts.google.com/share?selection.family=Lora:ital,wght@0,400..700;1,400..700|Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.08)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.08)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.12)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #1d5cab;
  color: white;
  padding: 12px 24px;
  border-radius: 0px;
  font-weight: 600;
  transition: all 250ms ease;
  cursor: pointer;
  border: 1px solid #1d5cab;
}

.btn-primary:hover {
  background: #ffffff;
  color: #1d5cab;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1d5cab;
  border: 2px solid #1d5cab;
  padding: 12px 24px;
  border-radius: 0px;
  font-weight: 600;
  transition: all 250ms ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #1d5cab;
  color: #ffffff;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 0px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 250ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: #1d5cab;
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #CBD5E1;
  border-radius: 0px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #1d5cab;
  outline: none;
  box-shadow: 0 0 0 3px rgba(29, 92, 171, 0.15);
}
```

### Modals

```css
.modal-overlay {
  background: rgba(10, 27, 45, 0.85);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 0px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Classic Academic (IIT Madras style)

**Keywords:** High density, structured grids, thin clean borders (1px), subtle lift shadows, warm sand elements, deep red highlights, solid high contrast.

**Best For:** Institutional websites, universities, research platforms, scholarly applications

**Key Effects:** Soft hover transitions (200-300ms), card micro-elevations, clear typography hierarchies, clean borders

### Page Pattern

**Pattern Name:** Institutional Informational Hub

- **CTA Placement:** Right and above fold
- **Section Order:** Hero Banner > Stats & Announcements > News & Events > Program Grids > Recruiters > Research Highlights

---

## Anti-Patterns (Do NOT Use)

- ❌ Playful cartoon shapes (claymorphism/bubbly)
- ❌ Comic/childish fonts (Comic Neue, Baloo)
- ❌ Too-low contrast text on warm backgrounds (keep text dark slate)
- ❌ Emojis as icons — Use SVG icons (Heroicons, Lucide, FontAwesome)
- ❌ Instant hover jumps (always transition colors/transforms)
- ❌ Missing hover cursors on active lists

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
