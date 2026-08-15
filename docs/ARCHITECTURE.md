# XR Lab — System Architecture

This document describes the high-level architecture, technical design, and core systems of **XR Lab**.

---

## 1. Architectural Overview

XR Lab is designed as a **unified monorepo** containing two main surfaces and a shared layer:

```text
                               ┌───────────────────────────┐
                               │          XR LAB           │
                               │        (Monorepo)         │
                               └─────────────┬─────────────┘
                                             │
                      ┌──────────────────────┴──────────────────────┐
                      │                                             │
        ┌─────────────▼─────────────┐                 ┌─────────────▼─────────────┐
        │     apps/dashboard        │                 │        apps/website       │
        │   (Private Workspace)     │                 │     (Public Showcase)     │
        │    Next.js + Tailwind     │                 │    Next.js + Tailwind     │
        └─────────────┬─────────────┘                 └─────────────▲─────────────┘
                      │                                             │
                      │ 1. Create & Manage                          │ 4. Read Published Content
                      │ 2. Stage & Review                           │    (Status == 'published')
                      │ 3. Explicit Publish Action                  │
                      │                                             │
                      └──────────────────────► ◄────────────────────┘
                                             │
                               ┌─────────────┴─────────────┐
                               │         PACKAGES          │
                               │  - @xrlab/types           │
                               │  - @xrlab/content         │
                               │  - @xrlab/ui              │
                               │  - @xrlab/config          │
                               └─────────────┬─────────────┘
                                             │
                      ┌──────────────────────┴──────────────────────┐
                      │                                             │
        ┌─────────────▼─────────────┐                 ┌─────────────▼─────────────┐
        │         content/          │                 │           data/           │
        │  Git-versioned Markdown   │                 │   Structured JSON/SQLite  │
        │  (Journal, Exp, Projects) │                 │   (Roadmap, Skills, Meta) │
        └───────────────────────────┘                 └───────────────────────────┘
```

---

## 2. Monorepo Organization

We use standard **npm workspaces** to coordinate dependencies across apps and shared packages without introducing unnecessary build tool overhead.

### Workspaces
- **`apps/dashboard`**: Private application for daily logging, roadmap management, capability tracking, and content staging.
- **`apps/website`**: Public application providing an editorial, clean, responsive showcase of published work.
- **`packages/types`**: Shared TypeScript types and Zod schemas for all domain entities.
- **`packages/content`**: Shared file-system content parser, validator (`gray-matter` + Zod), and slug resolver.
- **`packages/ui`**: Shared UI design tokens, typography, and foundational components.
- **`packages/config`**: Shared configurations (Tailwind, TypeScript, ESLint).

---

## 3. Data & Storage Model

1. **Published / Long-form Content (`/content`)**:
   - Stored as portable, human-readable Markdown/MDX files.
   - Preserves complete independence from database locks.
   - Versioned directly in Git.
2. **Dashboard State & Roadmap (`/data`)**:
   - Structured JSON records for skills evaluation, progress metrics, roadmap nodes, and configuration.
   - Easily migrated to SQLite / Supabase when sync or cloud persistence is desired.
3. **Media Assets (`/public`)**:
   - Static images, prototype captures, diagrams, and video assets.

---

## 4. Publishing Flow & Boundaries

- **Strict Boundary**: The website application strictly resolves items where `status === 'published'`.
- **Workflow**:
  1. Entry created as `draft` in dashboard.
  2. Refined, evidence attached (`working` / `review`).
  3. User triggers **Publish** action.
  4. System formats and outputs Markdown/MDX to `/content/<category>/`.
  5. Website automatically builds/renders the newly published post.
  6. Changes are committed to Git.

---

## 5. Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content Parser**: Gray-matter + remark/rehype (or MDX)
- **Schema Validation**: Zod
- **Version Control**: Git & GitHub
- **Deployment**: Vercel (or Next.js compatible hosting)
