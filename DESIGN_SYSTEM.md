---
name: Obsidian Crimson
colors:
  surface: "#131313"
  surface-dim: "#131313"
  surface-bright: "#393939"
  surface-container-lowest: "#0e0e0e"
  surface-container-low: "#1c1b1b"
  surface-container: "#201f1f"
  surface-container-high: "#2a2a2a"
  surface-container-highest: "#353534"
  on-surface: "#e5e2e1"
  on-surface-variant: "#e7bcb8"
  inverse-surface: "#e5e2e1"
  inverse-on-surface: "#313030"
  outline: "#ae8883"
  outline-variant: "#5e3f3c"
  surface-tint: "#ffb4ab"
  primary: "#ffb4ab"
  on-primary: "#690006"
  primary-container: "#ff544b"
  on-primary-container: "#5c0005"
  inverse-primary: "#c00014"
  secondary: "#c8c6c5"
  on-secondary: "#303030"
  secondary-container: "#474746"
  on-secondary-container: "#b7b5b4"
  tertiary: "#c6c6cf"
  on-tertiary: "#2f3037"
  tertiary-container: "#909099"
  on-tertiary-container: "#282930"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#ffdad6"
  primary-fixed-dim: "#ffb4ab"
  on-primary-fixed: "#410002"
  on-primary-fixed-variant: "#93000c"
  secondary-fixed: "#e5e2e1"
  secondary-fixed-dim: "#c8c6c5"
  on-secondary-fixed: "#1b1b1c"
  on-secondary-fixed-variant: "#474746"
  tertiary-fixed: "#e2e1eb"
  tertiary-fixed-dim: "#c6c6cf"
  on-tertiary-fixed: "#1a1b22"
  on-tertiary-fixed-variant: "#45464e"
  background: "#131313"
  on-background: "#e5e2e1"
  surface-variant: "#353534"
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.3"
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: "400"
    lineHeight: "1.5"
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1"
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: "600"
    lineHeight: "1.2"
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system establishes a high-performance, premium atmosphere for Task Note. It targets power users who value focus, speed, and precision. The aesthetic is a sophisticated fusion of **Glassmorphism** and **Minimalism**, characterized by deep graphite surfaces that recede into the background, allowing neon accents to guide the user's eye toward critical actions and statuses.

The mood is cinematic yet functional—drawing inspiration from the structural efficiency of Linear and the typographic clarity of Obsidian. It avoids unnecessary decorative elements, instead using light and transparency to create a sense of depth and hierarchy. The interface should feel like a digital cockpit: dark, quiet, and intensely responsive.

## Colors

The palette is anchored by a "True Dark" foundation. The core background is a deep, non-distracting graphite (#121212).

- **Primary Neon:** #FF3131 is used sparingly for destructive actions, primary CTAs, and urgent statuses. It is a high-energy "signal" color.
- **Surface Neutrals:** We use a tiered scale of grays (#1E1E1E for cards, #2A2A2A for borders) to define structural boundaries without relying on high-contrast lines.
- **Functional Accents:** While red is primary, we utilize gold (#EAB308) for "Important" and emerald (#10B981) for "Completed" states to maintain a clear status taxonomy.
- **Glass Effect:** Translucent layers use a white alpha (rgba(255, 255, 255, 0.03)) to create the frosted glass effect over background elements.

## Typography

This design system uses **Geist** for its technical precision and elegant proportions, ensuring the SaaS feels modern and developer-adjacent. For metadata and utility labels, **JetBrains Mono** provides a monospaced contrast that evokes the feel of a high-end markdown editor or IDE.

Text hierarchy is strictly enforced through weight and color. Headlines utilize near-white (#F4F4F5), while body text uses a softened gray (#A1A1AA) to reduce eye strain during long working sessions. All caps are reserved exclusively for `label` roles to indicate secondary metadata or system statuses.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** for content areas, ensuring that task lists and note editors maintain a consistent line length for optimal readability.

- **Desktop:** A 12-column grid with a maximum content width of 1280px. Sidebars are fixed at 240px or 280px depending on nesting.
- **Mobile:** A single-column fluid layout with 16px side margins.
- **Density:** The design system prioritizes "Information Density" over "White Space." Spacing is tight (8px and 16px increments) to allow power users to see more data at once, mirroring the efficiency of tools like Linear.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Glassmorphism** rather than traditional drop shadows.

1.  **Level 0 (Base):** #121212. The canvas.
2.  **Level 1 (Navigation/Sidebar):** #18181B. Slightly lifted.
3.  **Level 2 (Cards/Main Surface):** Translucent background (rgba(30, 30, 30, 0.6)) with a `16px` backdrop-blur.
4.  **Level 3 (Modals/Popovers):** Higher opacity (rgba(30, 30, 30, 0.95)) with a subtle outer glow using the primary color at 10% opacity for focused elements.

Borders are critical: use 1px solid rgba(255, 255, 255, 0.08) for all container edges. For active or primary elements, the border can transition to a subtle Crimson gradient.

## Shapes

The shape language is **Soft** but disciplined. We use 4px (`0.25rem`) for small elements like checkboxes and inner buttons, and 8px (`0.5rem`) for main task cards and input fields. This slight rounding takes the "edge" off the dark theme without making the professional tool feel overly playful or "bubbly." Larger containers like modals may use `rounded-lg` (12px) to stand out as distinct architectural layers.

## Components

### Buttons

- **Primary:** Solid #FF3131 with white text. On hover, a subtle outer glow (0px 0px 15px rgba(255, 49, 49, 0.4)).
- **Secondary:** Ghost style. rgba(255, 255, 255, 0.05) fill with 1px border.

### Cards

Cards are the "Task Note" signature. They must feature a `backdrop-filter: blur(12px)`. The border should be a top-to-bottom subtle gradient to imply a light source from above.

### Input Fields

Inputs use a dark fill (#09090B) with a subtle inset shadow to appear recessed into the glass surface. The focus state replaces the border with a 1px #FF3131 solid line.

### Chips/Badges

Small, monochromatic badges for tags. For high-priority chips (e.g., "Urgent"), use a dark red background with bright red text to ensure legibility while maintaining the dark aesthetic.

### Progress Indicators

Thin 2px lines. Use the neon primary color for the progress bar to make completion status feel rewarding and high-contrast against the dark background.
