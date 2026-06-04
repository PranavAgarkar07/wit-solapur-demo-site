# Graph Report - .  (2026-06-04)

## Corpus Check
- 42 files · ~385,660 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 191 nodes · 262 edges · 25 communities (19 shown, 6 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_BM25 Search Engine|BM25 Search Engine]]
- [[_COMMUNITY_Design System Generator|Design System Generator]]
- [[_COMMUNITY_Design Reasoning Pipeline|Design Reasoning Pipeline]]
- [[_COMMUNITY_Frontend UI Components|Frontend UI Components]]
- [[_COMMUNITY_Build Dependencies|Build Dependencies]]
- [[_COMMUNITY_Institute Identity|Institute Identity]]
- [[_COMMUNITY_Charts & External APIs|Charts & External APIs]]
- [[_COMMUNITY_Page Initialization|Page Initialization]]
- [[_COMMUNITY_Header & Navigation|Header & Navigation]]
- [[_COMMUNITY_Design Token System|Design Token System]]
- [[_COMMUNITY_Accreditations & Leadership|Accreditations & Leadership]]
- [[_COMMUNITY_Site Pages|Site Pages]]
- [[_COMMUNITY_Department Icons|Department Icons]]
- [[_COMMUNITY_UIUX Pro Max Skills|UI/UX Pro Max Skills]]
- [[_COMMUNITY_Campus Photography|Campus Photography]]
- [[_COMMUNITY_Search CLI Formatter|Search CLI Formatter]]
- [[_COMMUNITY_OpenCode Plugin Deps|OpenCode Plugin Deps]]
- [[_COMMUNITY_Logo Integrity Tests|Logo Integrity Tests]]
- [[_COMMUNITY_Awards & Rankings|Awards & Rankings]]
- [[_COMMUNITY_Plugin Configuration|Plugin Configuration]]
- [[_COMMUNITY_Accent Color|Accent Color]]

## God Nodes (most connected - your core abstractions)
1. `Main JavaScript Module` - 16 edges
2. `Walchand Institute of Technology Solapur` - 13 edges
3. `DesignSystemGenerator` - 12 edges
4. `Design System MASTER - WIT (IIT Madras Design)` - 10 edges
5. `Header Component HTML+CSS` - 10 edges
6. `_search_csv()` - 9 edges
7. `BM25` - 8 edges
8. `generate_design_system()` - 8 edges
9. `Homepage` - 8 edges
10. `Placements Page` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Design System MASTER - WIT (IIT Madras Design)` --references--> `Walchand Institute of Technology, Solapur (WIT Solapur)`  [INFERRED]
  design-system/walchand-institute-of-technology/MASTER.md → public/images/wit-logo.png
- `Header Component HTML+CSS` --references--> `WIT Brand Color Palette`  [INFERRED]
  src/components/header.html → tailwind.config.js
- `Header Component HTML+CSS` --references--> `Lato Font Configuration`  [INFERRED]
  src/components/header.html → tailwind.config.js
- `Homepage` --references--> `Main JavaScript Module`  [EXTRACTED]
  index.html → src/main.js
- `About Us Page` --references--> `Main JavaScript Module`  [EXTRACTED]
  about.html → src/main.js

## Communities (25 total, 6 thin omitted)

### Community 0 - "BM25 Search Engine"
Cohesion: 0.16
Nodes (15): BM25, detect_domain(), _load_csv(), Lowercase, split, remove punctuation, filter short words, Build BM25 index from documents, Score all documents against query, Load CSV and return list of dicts, Core search function using BM25 (+7 more)

### Community 1 - "Design System Generator"
Cohesion: 0.2
Nodes (16): _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md(), format_page_override_md(), generate_design_system(), _generate_intelligent_overrides(), persist_design_system() (+8 more)

### Community 2 - "Design Reasoning Pipeline"
Cohesion: 0.16
Nodes (9): DesignSystemGenerator, Select best matching result based on priority keywords., Extract results list from search result dict., Generate complete design system recommendation., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category. (+1 more)

### Community 3 - "Frontend UI Components"
Cohesion: 0.16
Nodes (3): initCharts(), initHomeChart(), initPlacementsChart()

### Community 4 - "Build Dependencies"
Cohesion: 0.14
Nodes (13): devDependencies, autoprefixer, postcss, tailwindcss, vite, name, private, scripts (+5 more)

### Community 5 - "Institute Identity"
Cohesion: 0.19
Nodes (12): Engineering Education, Trust, Wisdom, Dr. G. M. Joshi, WIT Favicon - Small brand icon used in browser tabs, likely simplified WIT monogram, Blue Color, Walchand Institute of Technology, Solapur, WIT Solapur Logo (+4 more)

### Community 6 - "Charts & External APIs"
Cohesion: 0.24
Nodes (12): Chart.js Library, Clearbit Logo API, Logo Download Script, Homepage, initCharts Function, initHomeChart Function, initPlacementsChart Function, Placement Statistics Dataset (+4 more)

### Community 7 - "Page Initialization"
Cohesion: 0.18
Nodes (11): initCounters Function, initGallery Function, initHeroSlideshow Function, initMarquee Function, initPreloader Function, initProgressiveImages Function, initSearch Function, injectComponents Function (+3 more)

### Community 8 - "Header & Navigation"
Cohesion: 0.22
Nodes (11): Header Component HTML+CSS, initNavbar Function, Lato Font Configuration, CSS Marquee Keyframe Animation, Sticky Navbar Scroll Behavior, PostCSS Configuration, Recruiter Brand Colors, Tailwind CSS Configuration (+3 more)

### Community 9 - "Design Token System"
Cohesion: 0.2
Nodes (10): Background Color #FAF7F2, Design System MASTER - WIT (IIT Madras Design), Lato (Body Font), Lora (Heading Font), Primary Color #1d5cab, Secondary Color #1E293B, Classic Academic Style (IIT Madras), Text Color #0F172A (+2 more)

### Community 10 - "Accreditations & Leadership"
Cohesion: 0.25
Nodes (8): UGC Autonomous Status, NAAC A+ Accreditation, NBA Accreditation, Prof. Dr. P. N. Athavale (Principal), Mr. Prasanna V. Ekhande (TPO), Dr. Sachin Ratikant Gengaje (Incharge Principal), Vision and Mission Statements, Walchand Institute of Technology Solapur

### Community 11 - "Site Pages"
Cohesion: 0.53
Nodes (6): About Us Page, Contact Page, Departments Page, Font Awesome Icons, Footer Component, Gallery Page

### Community 12 - "Department Icons"
Cohesion: 1.0
Nodes (6): Civil Engineering Icon - Flat vector icon representing Civil department, likely depicting building or construction symbol, Computer Science Engineering Icon - Flat vector icon representing CSE department, likely depicting a computer monitor or code symbol, Electronics and Computer Management Icon - Flat vector icon representing ECM department, likely depicting chip or hybrid symbol, Electronics and Telecommunication Icon - Flat vector icon representing ENTC department, likely depicting circuit or signal waves, Information Technology Icon - Flat vector icon representing IT department, likely depicting network or data symbol, Mechanical Engineering Icon - Flat vector icon representing Mechanical department, likely depicting gear or engine symbol

### Community 13 - "UI/UX Pro Max Skills"
Cohesion: 0.6
Nodes (6): UI/UX Pro Max Core BM25 Search (.agent), UI/UX Pro Max Design System Generator (.agent), UI/UX Pro Max Search CLI (.agent), UI/UX Pro Max Core BM25 Search (.opencode), UI/UX Pro Max Design System Generator (.opencode), UI/UX Pro Max Search CLI (.opencode)

### Community 14 - "Campus Photography"
Cohesion: 0.6
Nodes (5): Campus Banner - Background image for research/achievements section overlay, likely a striking campus photo used as dark overlay backdrop, Campus Hero 1 - Scenic campus photograph used as hero slide and about page banner, likely building exterior or green campus shot, Campus Hero 2 - Wide-angle campus photograph used on about, departments, and contact pages, likely academic block or entrance, Campus Hero 3 - Banner image used on placements page, likely showing corporate events, auditorium, or placement activities, Hero Slide 1 - Full-width banner image for homepage hero carousel, likely showing main campus building or academic scene

## Knowledge Gaps
- **34 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Main JavaScript Module` connect `Page Initialization` to `Header & Navigation`, `Site Pages`, `Charts & External APIs`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `Header Component HTML+CSS` connect `Header & Navigation` to `Site Pages`, `Charts & External APIs`, `Page Initialization`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `DesignSystemGenerator` connect `Design Reasoning Pipeline` to `Design System Generator`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Design System MASTER - WIT (IIT Madras Design)` (e.g. with `Walchand Institute of Technology, Solapur (WIT Solapur)` and `UI/UX Pro Max Skill (agent)`) actually correct?**
  _`Design System MASTER - WIT (IIT Madras Design)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `Header Component HTML+CSS` (e.g. with `Homepage` and `About Us Page`) actually correct?**
  _`Header Component HTML+CSS` has 8 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _77 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Build Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._