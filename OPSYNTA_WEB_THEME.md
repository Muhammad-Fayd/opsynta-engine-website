# Opsynta Web Theme — Standard (Dusk Atlas)

Capture and reuse instructions: invoke with **"build the Opsynta site"** or **"use the Opsynta theme"**.
This is the standard theme for ALL Opsynta web and LinkedIn-post assets. Do not substitute the palette, the font stack, or the voice.

---

## 1. Design System — Dusk Atlas Combo

### Color Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary light | Soft Peach | `#FAE4CF` | Light section backgrounds, page body, hero |
| Primary light 2 | Deep Peach | `#F5D9BD` | Reframe cards, resolution blocks, peach-on-peach layering |
| Primary dark | Deep Navy | `#0A0F23` | Header, footer, navy sections, stat cards, diagnosis cards, Socratic card |
| Primary dark 2 | Navy 2 | `#131933` | Slightly lighter navy for cards on navy sections |
| Text on peach | Ink | `#0A0F23` | Body text, headlines on light sections |
| Text on navy | Soft Peach | `#FAE4CF` | Headlines and body on dark sections |
| Muted on peach | Muted Slate | `#5A6378` | Captions, metadata, labels on peach backgrounds |
| Muted on navy | Dust Grey | `#9CA3B4` | Captions, metadata, labels on navy backgrounds |
| Accent 1 | Gold | `#D4AF37` | Borders, dividers, key stat highlights, CTA buttons, headline accents |
| Accent 1 light | Gold Light | `#E8C766` | Text on navy (more readable than pure gold), slogan text |
| Accent 2 | Cyan Spark | `#00C2FF` | Socratic-question label, diagnostic tags, interactive focus (sparingly) |
| Accent 3 | Red | `#E53E3E` | Failure/unmapped left borders, error states |
| Accent 4 | Green | `#38A169` | Success/mapped left borders, success states |

### Typography

| Role | Font | Weights | Usage |
|---|---|---|---|
| Display / Headlines | **Playfair Display** | 400, 500, 600, 700, 800, 900 (incl. italic) | Headlines, stat numbers, manifesto quotes, signature name, loud section titles — italics reserved for quotes/slogans |
| Body / UI | **Inter** | 400, 500, 600, 700, 800 | Body text, subheads, card descriptions, button labels |
| Stats / Labels | **JetBrains Mono** | 400, 500, 600 | Percentages, code, metadata, eyebrow pills, tags, capability acronyms, contact details |

Google Fonts load:
`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap`

---

## 2. Brand Elements (Mandatory everywhere)

### Slogan (verbatim — never alter)
> "If your process can be mapped, it will be made autonomous."

- Appears in the site HEADER (right side, desktop) and FOOTER (top row + manifesto strip)
- Always italic Playfair Display
- Accent words ("mapped", "autonomous") in peach `#FAE4CF`, bold, non-italic (on navy)
- On peach backgrounds: accent words in gold `#D4AF37`, bold, non-italic

### Logo
- 3D sphere + OPSYNTA wordmark
- Always rendered inside a **peach chip** (chip: background `#FAE4CF`, padding 6–10px, `border: 1px solid rgba(212,175,55,0.4)`, `border-radius: 10px`)
- Missing brand asset → use the inline SVG sphere in `index.html` (gold/peach gradient ringed sphere + wordmark in Ink)

### Signature (footer only — never at top)
- **Name**: Muhammad Fayd (Playfair Display, `#FAE4CF`)
- **Role**: Founder · Opsynta Engine (JetBrains Mono, `#E8C766`, uppercase, letter-spacing 0.22em)
- **Email**: mohamed.fayd5589@gmail.com (JetBrains Mono, `#FAE4CF`)
- **Mobile · WhatsApp**: 01152701025 (JetBrains Mono, `#E8C766`)

---

## 3. Layout Principles (Web adaptation)

- Alternating section cadence: **peach (light) → navy (dark) → peach → navy** … light sections carry navy/dark cards; dark sections carry navy-2 cards.
- Section eyebrow: mono pill, uppercase, letter-spacing 0.22em, gold border on light sections / gold-light border on dark sections.
- Section headline: Playfair Display, weight 800, tight line-height (1.06), gold accent words (`#D4AF37` on peach, `#E8C766` on navy).
- All section headings on light backgrounds use Ink `#0A0F23`; on dark backgrounds use `#FAE4CF`.
- Cards: `border-radius: 10px`; left-border diagnosis styling for outcome cards (red = unmapped/failure, green = mapped/success).
- Code blocks: JetBrains Mono, navy background, gold-light keywords.
- `a` hover/focus: gold underline or gold border; keyboard focus ring uses Cyan Spark `#00C2FF`.

---

## 4. Voice — Socratic-Computational

### Tone
- **Socratic register**: asks questions; does not pitch.
- **Computational register**: answers with precision — names the pattern, the primitive, the capability, the outcome.
- **Authority**: projects intelligence across verticals simultaneously (FinTech, Healthcare, Manufacturing, Energy, Retail).

### Forbidden
- Vendor pitch, feature-list intro, testimonial claims, vertical framing ("the healthcare solution for…"), comparative claims ("23% faster than…").

### Permitted
- Socratic reframing, pattern-naming, capability mapping, outcome claims ("If your process can be mapped, it will be made autonomous."), cross-vertical analogy.

---

## 5. Standard Page Sections

1. Sticky navy header — logo chip (L), slogan (R), anchor nav, CTA
2. **Hero** (peach) — eyebrow, Playfair headline with gold accents, subhead, 2 CTAs, 3 navy stat cards
3. **The Reframe** (navy) — the three bottleneck primitives (unstructured data / human delay / interface friction → SCV+MDA / ACE+IFE / IFE+ITIN)
4. **Capabilities** (peach) — 6 cards: ACE, IFE, PDO, ITIN, SCV, MDA (endpoint, CU, latency, description)
5. **Architecture** (navy) — 5-layer composition: L1 Source Systems → L2 Semantic Substrate → L3 Capability APIs → L4 IFE Runtime → L5 Operator Surface ("no data copied, queries federate")
6. **Industries** (peach) — FinTech, Healthcare, Manufacturing, Energy, Retail (systems + vendors)
7. **Partner SDK** (navy) — embed flow + code sample + API contract notes (auth, idempotency, rate limits)
8. **Pricing** (peach) — Sandbox/Starter/Growth/Enterprise/Custom, CU model, revenue share 70/30
9. **Resolution** (navy) — `01 Map → 02 Predict → 03 Execute`, then Socratic question card (Cyan label) + CTA
10. **Footer** (navy) — logo chip + slogan, 3-column signature (name/role · email · WhatsApp), manifesto strip

---

## 6. Verification (mandatory after building/rendering)

1. Slogan visible in header and footer (verbatim).
2. Muhammad Fayd signature at footer ONLY.
3. Playfair / Inter / JetBrains Mono all loading.
4. No text cutoffs; responsive at 360px–1440px.
5. Gold accents present on headlines; no blank wasted space between sections.
6. Voice check: no vendor-pitch or comparative-claim language.