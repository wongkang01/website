# Implementation Review and Fix Plan

Based on the review of the current implementation against the design requirements and the original video details, here is the list of discrepancies and the plan to fix them.

## 1. Hero Section (Voronoi 3D Background)
**Current State:** The Three.js Voronoi background is implemented but currently not visible.
**Required Fix:**
* Debug the Three.js canvas setup. The issue is likely caused by the canvas container missing proper layout rules (e.g., width/height, z-index, or absolute positioning).
* Ensure the nodes and edges are distinctly visible (white particles and lines) and that the highlight effect correctly responds to cursor proximity without "gravitating" towards it.

## 2. Navigation Bar
**Current State:** Uses `mix-blend-difference` to achieve contrast.
**Required Fix:**
* Implement the "floating" design with a semi-transparent effect.
* Use Intersection Observer or scroll-based state to explicitly swap the navbar theme (text color and background blur/opacity) depending on the background it's scrolling over, rather than relying solely on `mix-blend-difference`.

## 3. Education Section (Hero)
**Current State:** The education timeline is statically rendered.
**Required Fix:**
* Implement a vertical progressive animation using Framer Motion (`motion/react`).
* The timeline line and the individual education milestones should animate in sequentially as the page loads or comes into view.

## 4. Experience Section
**Current State:** Rendered as a vertical list.
**Required Fix:**
* Redesign the layout entirely into a single row of 3 cards (for AdminLess.AI, AI Singapore, and NCS Group).
* Animate the cards so they expand horizontally/vertically on hover.
* Apply the distinct background colors to each column as seen in the video (e.g., using specific pastel or brand colors).

## 5. My Works (Masonry & Scroll Animations)
**Current State:** Uses a simple CSS columns layout (`columns-2 md:columns-4`) and basic scaling.
**Required Fix:**
* Implement a strict 5-column masonry structure.
* **Layout:** Columns 1 & 5 will contain taller cards. Columns 2, 3, & 4 will contain regular square cards.
* **Positioning:** Apply precise vertical offsets via CSS or inline styles to create the "V-shape" layout centered around the main section text.
* **Scroll Animation:** Connect GSAP ScrollTrigger or Framer Motion `useScroll` to create a parallax effect where the cards slide up over the text at varying speeds while the text fades out.

## 6. Featured Projects (Expanding Cards)
**Current State:** Expanding effect is basic and housed entirely in a single file (`Projects.tsx`). Content is visible immediately.
**Required Fix:**
* Refactor into a scalable structure (3-4 separate TSX files: e.g., `FeaturedProjects.tsx`, `ProjectCard.tsx`, `ProjectContent.tsx`).
* **Scroll Logic:** Ensure it acts specifically on the bottom 3 cards.
* **Content Visibility:** Implement logic (using `ResizeObserver` or layout thresholds) so that the inner content of the project cards only fades in/mounts when the card reaches a specific width and height during its expansion.

## 7. Highlight Effects (Experience and Contact)
**Current State:** Text in the Experience and Contact sections uses a highlight effect (possibly background colors on text spans).
**Required Fix:**
* Remove the highlight effect applied to the text in both the Experience section and the Contact section as it departs from the intended style.

---
Please let me know if this plan aligns with your expectations or if you would like me to adjust any of the approaches before I begin coding the fixes!
