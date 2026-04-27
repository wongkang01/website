# Website Video Teardown

Source reviewed: `/Users/jovitaeliana/Downloads/Screen Recording 2026-03-21 at 1.00.35 AM.mp4`

## Purpose

This document collates the visual and interaction findings from the reference video before rebuilding the site. It is intended to serve as a working spec for the implementation phase.

## Review Method

- Reviewed the full 28.27 second recording through dense frame sampling across the entire clip.
- Cross-checked hero, transition, hover, carousel, and lower-page states separately.
- Captured section-level contact sheets to avoid relying on a few representative stills.

## Global Design System

### Visual theme

- Predominantly near-black background for most sections.
- One light section for the work experience carousel.
- Accent color is a mint/cyan green.
- White primary text with low-contrast gray secondary text.
- Borders are thin, understated, and used frequently.
- Overall mood is minimal, premium, technical, and editorial rather than product-marketing.

### Typography

- Very large bold display type for major headings.
- Tiny uppercase labels for metadata and section eyebrows.
- Dense but restrained secondary copy.
- Tight, consistent spacing between title, subtitle, and metadata blocks.

### Interaction language

- Smooth vertical scroll between sections.
- Sticky header remains visible throughout.
- Hover and active states are subtle: border emphasis, glow, scale, and card expansion.
- Motion is deliberate and sparse, not decorative.

## Page Structure

1. Sticky header
2. Hero
3. Work experience carousel
4. Skills / technical stack grid
5. Featured projects showcase
6. Expanded project detail states
7. Mid-page projects CTA
8. Complete portfolio grid
9. Contact CTA section
10. Footer

## Element Inventory

### 1. Sticky Header

#### Structure

- Fixed header spanning full width.
- Left brand block.
- Centered navigation links.
- Right-side CTA button.

#### Elements

- Mint square icon followed by `WK`.
- Navigation links:
  - `Experience`
  - `Skills`
  - `Projects`
  - `Contact`
- CTA button: `INQUIRE`

#### Styling

- Dark background.
- Thin bottom divider.
- Compact vertical padding.
- Button is outlined rather than filled.

#### Behavior

- Remains visible across all sections.
- Nav likely acts as anchor links.

### 2. Hero Section

#### Structure

- Full-screen or near full-screen dark hero.
- Left content column for title and CTA.
- Right content column for education timeline.
- Background animation spans the full section.

#### Elements

- Availability pill near top-left:
  - visually reads as an availability / internship status badge
- Main heading:
  - `Wong Kang`
- Supporting paragraph:
  - describes AI engineering, autonomous agents, RAG systems, and full-stack LLM applications
- Primary CTA:
  - `View Projects`
- Secondary CTA:
  - `Resume`
- Education timeline block with three entries:
  - `SUTD`
  - `UofT`
  - `ACJC`
- `CURRENT` badge on the active timeline row
- Bottom-centered `SCROLL` label

#### Background finding

- The hero background is not a wireframe treatment.
- It appears to be a subtle animated 3D tessellation / Voronoi-like mesh.
- The geometry is low-contrast and non-dominant.
- It functions as a modern technical backdrop rather than a foreground graphic.

#### Styling

- Large white heading with strong weight.
- Mint accent used in pill, buttons, and timeline highlights.
- Plenty of negative space.
- Right column is narrow and vertically structured.

#### Behavior

- Background mesh animates subtly.
- Scroll indicator suggests transition into the next section.
- No obvious large parallax effect was confirmed from the recording.

### 3. Work Experience Section

#### Structure

- Immediate theme inversion to light background.
- Section heading area at the top.
- Large centered carousel card.
- Narrow side cards used as previous/next previews.

#### Elements

- Eyebrow label:
  - `WORK EXPERIENCE`
- Heading:
  - `Where I've shipped`
- Short supporting sentence below heading.
- Center card contains:
  - icon tile
  - company name
  - role line
  - date range
  - several bullet points
  - technology tags
- Side preview cards:
  - one on the left
  - one on the right
  - vertical company labels
  - small icon tile

#### Observed companies

- `AdminLess.AI`
- `AI Singapore`
- `NCS Group`

#### Styling

- Very light background with thin gray borders.
- Mint used for top border emphasis and tags.
- Main card is much wider than side previews.
- Side cards are intentionally narrow and de-emphasized.

#### Behavior

- Carousel rotates between different employers.
- Center card changes while side cards preview adjacent entries.
- Transition appears lateral rather than full page replacement.

### 4. Skills / Technical Stack Section

#### Structure

- Dark section with a centered heading block above a large grid.
- Grid contains many technology tiles of varying emphasis.

#### Elements

- Eyebrow label:
  - `TECHNICAL ARSENAL`
- Heading:
  - `Built with precision`
- Subtitle describing full-stack / LLM / cloud / frontend capability
- Technology cards with:
  - logo
  - tool name
  - faint category label in some cases

#### Observed technologies

- OpenAI
- LangChain
- LangGraph
- Claude
- Gemini
- Azure
- AWS
- GCP
- Docker
- Vercel
- React
- Next.js
- TypeScript
- Python
- Node.js
- PostgreSQL
- Supabase
- Firebase
- Playwright
- Langfuse
- Yjs
- Electron
- Tailwind
- and additional smaller entries not all fully legible in every state

#### Styling

- Dark cards with hairline borders.
- Active card gains mint border and subtle glow/fill.
- Grid feels masonry-inspired but still aligned.
- Cards are spaced tightly with high density.

#### Behavior

- Hover or active selection enlarges or emphasizes a card.
- Focus shifts between tools while the rest remain visible.
- Section is interactive rather than a static logo wall.

### 5. Featured Projects Showcase

#### Structure

- Intro heading block followed by a large dark showcase canvas.
- Cards are arranged asymmetrically with varied heights and vertical offsets.

#### Elements

- Eyebrow line above heading, grouping content categories:
  - appears to reference `PROJECTS`, `HACKATHONS`, and `OPEN SOURCE`
- Heading:
  - `My Works`
- Short supporting sentence under heading
- Multiple project tiles, each showing:
  - small category label
  - large initials
  - project name

#### Observed project names

- `Report Creator`
- `DeepResearch`
- `Wandr`
- `RegCheck`
- `SeeFood`
- `OptiStaff`
- `Crop Yield`
- `Alder Explorer`
- `DeepSeekers`
- `Retake`
- `AFFINE CLI`
- `Agora`

#### Styling

- Large black negative space around tiles.
- Cards look suspended in a sparse field rather than packed in a neat grid.
- Background includes oversized faint text treatment behind the cards:
  - `My Works`

#### Behavior

- Different cards are highlighted as the cursor moves.
- Active card gets mint border emphasis.
- Layout itself remains stable while active state changes.

### 6. Expanded Project Detail State

#### Structure

- A selected center card expands into a wide detail panel.
- Neighbor cards remain visible as left and right side rails.
- The expanded panel occupies most of the width of the current cluster.

#### Elements inside expanded card

- Small icon tile at top-left
- Title
- Category or subtitle
- Badge or metric pill
- Paragraph description
- Tech stack chips
- Screenshot or media placeholder panel

#### Observed expanded projects

- `Agora`
- `AFFINE CLI`
- `Retake`

#### Styling

- Expanded panel remains dark, with slightly stronger border emphasis.
- Side neighbor cards are darker and more collapsed.
- Chips use mint accents and compact pill styling.
- Media area appears as a muted rectangular placeholder rather than a bright image.

#### Behavior

- Selection transitions from grid tile to expanded center detail panel.
- Neighbor previews remain visible, suggesting keyboard or click-driven browsing.

### 7. Mid-Page Projects CTA

#### Structure

- Standalone centered button between showcase sections.

#### Elements

- Outlined button:
  - `VIEW ALL PROJECTS`

#### Styling

- Mint outline and text.
- Sits in a large field of negative space.

#### Behavior

- Likely scrolls or navigates to the full portfolio grid below.

### 8. Complete Portfolio Section

#### Structure

- Separate section below the featured showcase.
- Heading block on the left.
- Denser, more regular multi-column project grid below.

#### Elements

- Eyebrow:
  - `ALL PROJECTS`
- Small count badge next to the eyebrow
- Heading:
  - `Complete Portfolio`
- Repeated project cards with:
  - category label
  - initials
  - project name

#### Styling

- Dark background continues.
- Grid is more systematic than the featured showcase.
- Active card gets mint border and sometimes top-edge emphasis.

#### Behavior

- Cards are hoverable/selectable.
- Grid likely complements rather than replaces the featured showcase.

### 9. Contact CTA Section

#### Structure

- Large final call-to-action band with oversized headline and one button.

#### Elements

- Eyebrow:
  - `LET'S CONNECT`
- Headline:
  - `Build something`
  - `extraordinary`
  - `together.`
- CTA button:
  - `Get in touch`

#### Styling

- Very large typography.
- Accent color highlights the word `extraordinary`.
- Composition is left-aligned with substantial breathing room.

#### Behavior

- Functions as the closing conversion section before the footer.

### 10. Footer

#### Structure

- Thin divider line above footer content.
- Left-aligned branding block.
- Right-aligned external link group.

#### Elements

- Brand icon + text
- Copyright:
  - `WONG KANG • 2026` or visually equivalent year labeling
- Links:
  - `GITHUB`
  - `LINKEDIN`
  - `EMAIL`

#### Styling

- Extremely understated.
- Small uppercase text.
- Wide horizontal spacing between utility links.

## Repeated UI Patterns

### Pills / badges

- Used for availability, active status, and project metrics.
- Small uppercase typography.
- Mint accent with restrained fill or outline.

### Cards

- Dark or light depending on section theme.
- Hairline borders.
- Minimal radius if any.
- Hover emphasis via mint border/glow rather than scale-heavy animation.

### Chips / tags

- Used in experience and project detail cards.
- Compact rectangular pills.
- Mint border or fill treatment.

### Side preview rails

- Used in the experience carousel and expanded project detail states.
- Narrow cards flank the main selected item.
- Convey adjacency without overwhelming the focal content.

## Interaction Findings

### Confirmed

- Sticky header across page scroll.
- Hero animated tessellation / Voronoi background.
- Experience carousel with side previews.
- Skill cards with active hover/focus states.
- Projects showcase with highlighted tile states.
- Expanded project detail cards.
- Secondary portfolio grid below showcase.

### Likely but not fully confirmed

- Header links are anchor navigation.
- `INQUIRE`, `Resume`, and `Get in touch` trigger either contact actions or external links.
- `VIEW ALL PROJECTS` scrolls to the portfolio grid.

## Content Fidelity Notes

- The structural and interaction model is clear.
- Some small text inside dark cards is difficult to read at full certainty from the recording.
- Company names, section titles, and major project labels were legible.
- Fine descriptive copy may need either:
  - manual transcription from a higher-resolution source, or
  - placeholder text during the first implementation pass.

## Rebuild Priorities

If this is recreated faithfully, the highest-value elements to preserve are:

1. The dark/minimal visual system with mint accents
2. The hero tessellated animated background
3. The light-themed experience carousel with side preview cards
4. The interactive technical stack grid
5. The asymmetric featured projects layout
6. The expanded project detail interaction model
7. The strong closing CTA and minimal footer

## Open Questions For Build Phase

- Exact font family pairing used in the original
- Exact animation timing curves and durations
- Whether the hero mesh is canvas, WebGL, SVG, or shader-based
- Exact breakpoint behavior for mobile and tablet
- Exact destination behavior for all CTAs and nav links
