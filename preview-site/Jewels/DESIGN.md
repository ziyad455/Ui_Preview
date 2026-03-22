# Design System Documentation: Soft Luxury & Digital Craft

## 1. Overview & Creative North Star: "The Ethereal Curator"
This design system is built to evoke the quiet confidence of a high-end atelier. Our Creative North Star is **The Ethereal Curator**. We are moving away from the rigid, "boxed-in" structures of traditional e-commerce to create a digital experience that feels like browsing a physical gallery or a premium editorial magazine.

To achieve this, we lean into **intentional asymmetry** and **breathing room**. Instead of centering every element, we use staggered layouts and overlapping components (e.g., a high-resolution product image slightly overlapping a `surface-container` card) to create a sense of depth and curated "soul." We prioritize the object of desire—the jewelry—by treating the UI as a subtle, sophisticated stage rather than a distracting frame.

---

## 2. Colors: Tonal Depth & The "No-Line" Philosophy
Our palette is a study in warmth and light. We utilize Material Design tokens to create a hierarchy based on light reflection rather than structural lines.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. High-end design is felt, not outlined. Boundaries must be defined strictly through:
*   **Background Shifts:** Moving from `surface` (#FCF9F4) to `surface-container-low` (#F6F3EE).
*   **Tonal Transitions:** Using the `outline-variant` (#D0C5AF) at 10-20% opacity only if a visual "anchor" is required.

### Surface Hierarchy & Nesting
Treat the interface as stacked sheets of fine, handmade paper.
*   **Base:** `surface` (#FCF9F4) for the main canvas.
*   **Secondary Content:** `surface-container` (#F0EDE8) for product carousels or editorial blocks.
*   **Elevated Details:** `surface-container-lowest` (#FFFFFF) for cards that need to "pop" against a warmer background.

### Signature Accents: The "Gold Standard"
*   **Primary CTA:** Use `primary_container` (#D4AF37) for main action buttons. 
*   **Visual Soul:** Apply a subtle linear gradient to main headers or hero buttons (e.g., `primary` #735C00 to `primary_container` #D4AF37) to mimic the way light hits polished gold. Avoid flat, "plastic" looks.

---

## 3. Typography: Editorial Authority
The contrast between our serif and sans-serif choices creates a dialogue between heritage and modernity.

*   **Display & Headlines (Noto Serif):** These are our "Statement Pieces." Use `display-lg` and `display-md` with generous letter-spacing (-0.02em) to create an authoritative, editorial feel. 
*   **Body & Titles (Manrope):** Our sans-serif is clean and airy. `body-lg` (1rem) should be the workhorse for product descriptions, ensuring readability without sacrificing the "Modern" aesthetic.
*   **Labels (Manrope):** Use `label-md` in uppercase with 0.1rem letter-spacing for category tags or "New Arrival" badges to evoke luxury garment labeling.

---

## 4. Elevation & Depth: The Layering Principle
We reject the "drop shadow" of the early web. We use **Ambient Shadows** and **Tonal Layering** to create a sophisticated sense of 3D space.

*   **Ambient Shadows:** When an element must float (like a Quick-Buy modal), use a highly diffused shadow: `box-shadow: 0 20px 40px rgba(77, 70, 53, 0.06)`. Note the use of the `on-surface-variant` color (#4D4635) for the shadow tint rather than pure black; this ensures the shadow feels like a natural casting of light.
*   **Glassmorphism:** For top navigation bars or floating action filters, use `surface` at 80% opacity with a `backdrop-blur: 12px`. This allows the jewelry photography to bleed through the UI, softening the edges and making the experience feel integrated.
*   **The Ghost Border:** If a form input requires a container, use the `outline-variant` (#D0C5AF) at 20% opacity. It should be "felt," not "seen."

---

## 5. Components: Refined Interaction

### Buttons
*   **Primary:** Background: `primary_container` (#D4AF37), Text: `on_primary_container` (#554300). Shape: `DEFAULT` (8px/0.5rem).
*   **Secondary/Text:** Use `on_surface` text with a 1px `primary` underline that expands on hover. No container.
*   **Interaction:** All buttons should have a subtle 200ms ease-in-out transition on hover, shifting the background color slightly toward `primary_fixed_dim`.

### Cards & Product Grids
*   **The Forbid Rule:** No divider lines between products. 
*   **Spacing:** Use `spacing.8` (2.75rem) between cards to give products the "luxury of space."
*   **Styling:** Use `surface-container-low` for the card background with a `DEFAULT` (0.5rem) or `md` (0.75rem) corner radius.

### Input Fields
*   **Style:** Minimalist. No background color. Only a bottom border using `outline-variant` at 40% opacity. 
*   **Focus State:** The bottom border transitions to `primary` (#735C00) with a 2px thickness.

### Curated Components (Niche Suggestions)
*   **The Lookbook Carousel:** A staggered image component where the next item is partially visible and slightly offset vertically using `spacing.5`.
*   **The "Material Detail" Tooltip:** A `surface-container-highest` tooltip with a `glassmorphism` blur used to explain gemstone origins or gold carats.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place a `headline-lg` off-center to create a modern, high-fashion layout.
*   **Embrace the Void:** Use `spacing.16` or `spacing.20` for vertical padding between major sections to let the design breathe.
*   **Tonal Overlays:** Place text over imagery using a `surface` gradient overlay (0% to 60% opacity) for maximum legibility without a "box."

### Don't:
*   **Don't Use Pure Black:** Never use #000000. Use `on_surface` (#1C1C19) for all text to maintain the "Soft Luxury" warmth.
*   **Don't Use Sharp Corners:** Avoid 0px radius. Even the smallest buttons should use `sm` (0.25rem) to maintain the feminine, approachable aesthetic.
*   **Don't Over-Animate:** Avoid bouncy or aggressive transitions. Every movement should be fluid, slow, and intentional (300ms–500ms).

---
*Director's Final Note: Remember, in luxury, less is not just more—less is everything. If an element doesn't serve the jewelry or the user's ease of movement, remove it.*