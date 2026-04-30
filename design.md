# Design System Document

## 1. Overview & Creative North Star: The Kinetic Grid
This design system is built upon the "Kinetic Grid" philosophy—a high-tech, minimalist aesthetic that balances mathematical precision with ethereal depth. It moves beyond the flat, standard web by treating the screen as a multi-dimensional workspace. 

By utilizing a pure black base and high-contrast aqua accents, we create a "Terminal Editorial" feel. The interface avoids a "templated" look through **intentional asymmetry**, where content blocks are often staggered, and **kinetic layering**, where glassmorphic elements appear to float over a structural constellation background. This is not just a UI; it is a digital cockpit for high-level technical execution.

---

## 2. Colors
The palette is rooted in the void of absolute black, allowing the primary teal and secondary aqua to "emit light" rather than just occupy space.

### Palette Tokens
*   **Background (Surface):** `#0e0e0e` (Deepest layer)
*   **Surface Container Lowest:** `#000000` (Pure black for high-contrast wells)
*   **Primary:** `#5bf4de` (The "active" glow)
*   **Secondary:** `#39fbf6` (High-energy accents)
*   **On-Surface Variant:** `#ababab` (Subdued technical metadata)

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. Structural definition must be achieved through **background color shifts**. Use the `surface-container` tiers to define areas. A section should be distinguished by moving from `surface` (#0e0e0e) to `surface-container-low` (#131313). 

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets. 
*   **Base:** `surface` (#0e0e0e)
*   **Embedded Cards:** `surface-container` (#191919)
*   **Floating/Active Elements:** `surface-bright` (#2c2c2c) with 60% opacity and a 20px backdrop blur.

### Signature Textures
Apply a subtle, geometric "constellation" pattern or a 24px dot grid at 5% opacity to the `surface` layer. This provides a sense of scale and mathematical "truth" to the minimalist void.

---

## 3. Typography
The typography system pairs the humanistic precision of **Plus Jakarta Sans** for large-scale impact with the utilitarian clarity of **Inter** for data-heavy environments.

*   **Display (Plus Jakarta Sans):** Used for "Hero" moments. Use tight letter-spacing (-0.04em) and high-contrast scales to create an editorial, premium feel.
*   **Headline (Plus Jakarta Sans):** For section titles. Integrate the "Teal Highlight" pattern—where a single word in a headline uses the `primary` color to draw the eye.
*   **Body (Inter):** Optimized for readability at 1rem. Use a generous line-height (1.6) to ensure the high-contrast white-on-black text doesn't cause eye fatigue.
*   **Labels (Space Grotesk):** Mono-spaced and all-caps. Used for "Technical Tags," timestamps, and breadcrumbs. These represent the "code" of the system.

---

## 4. Elevation & Depth
Depth in this system is a product of light and opacity, not physical shadows.

### The Layering Principle
Achieve hierarchy by "stacking" surface-container tiers. Place a `surface-container-highest` element on top of a `surface` background to create a soft, natural lift.

### Glassmorphism & Depth
For floating modals or persistent navigation bars:
*   **Background:** `surface-container` at 70% opacity.
*   **Backdrop Blur:** 12px to 24px.
*   **Outer Glow:** Instead of a shadow, use a 1px "Ghost Border" (see below) or a very soft teal outer glow (`rgba(45, 212, 191, 0.05)`) with a 40px spread.

### The "Ghost Border" Fallback
If an element requires a container edge for legibility, use the `outline-variant` token at 15% opacity. It should feel like a faint hairline of light, not a structural divider.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` background with `on-primary` text. Use a subtle `box-shadow` of the same color at 20% opacity to create a "glow" effect.
*   **Secondary:** Transparent background with a "Ghost Border" in `primary` and a `primary` text label.
*   **Tertiary:** All-caps `label-md` with a trailing icon (e.g., `->` or `↗`).

### Chips (Technical Tags)
*   **Styling:** Rectangular with `DEFAULT` (0.25rem) roundedness. 
*   **Color:** `surface-container-high` background with `primary` text in `label-sm` (Space Grotesk). No borders.

### Input Fields
*   **State:** Default state is a `surface-container-low` fill. 
*   **Focus State:** The background remains dark, but a 1px `primary` "Ghost Border" appears, accompanied by a soft teal inner glow.

### Cards
*   **Construction:** Use `surface-container` background. 
*   **Spacing:** Minimum 2rem (32px) internal padding. 
*   **Grouping:** Forbid divider lines. Use `16` (4rem) vertical spacing to separate card groups or subtle background shifts to denote different categories.

### Technical Timeline (Additional Component)
A vertical line using `outline-variant` at 20% opacity, with `primary` teal circles denoting "Events." Pair with `label-sm` metadata for a high-tech resume or log feel.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. Let some cards be wider than others to create a "Masonry" or "Bento" feel.
*   **Do** lean into the "Teal Highlight." Use it sparingly to guide the user's eye to the most important action or word.
*   **Do** use monospace typography for any data that feels "system-generated" (ID numbers, dates, tags).

### Don't
*   **Don't** use pure white (#FFFFFF) for long-form body text; use `on-surface-variant` to reduce harsh contrast.
*   **Don't** use standard "Drop Shadows." They feel muddy on a pure black background. Use "Tonal Layering" or "Glows" instead.
*   **Don't** use rounded corners larger than `xl` (0.75rem). This system is about precision and "High-Tech" edges, not "Bubbly" consumer friendliness.