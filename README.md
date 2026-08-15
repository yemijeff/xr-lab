# XR Lab

> A personal learning, experimentation, research, documentation, and publishing platform for a Product Designer transitioning into Spatial / XR Design.

---

> [!IMPORTANT]
> **MANDATORY INSTRUCTION FOR DEVELOPERS AND AI AGENTS:**
> **READ [`docs/XR-LAB-MASTER-SPEC.md`](./docs/XR-LAB-MASTER-SPEC.md) BEFORE MAKING ANY ARCHITECTURAL OR FUNCTIONAL CHANGES TO THIS PROJECT.**
> Do not make architectural, product, content-model, or workflow decisions that conflict with the master specification without first explaining the conflict and obtaining approval.

---

## 1. What is XR Lab?

XR Lab is a custom digital operating system and public portfolio that documents the professional transformation from **Product Designer → Spatial Designer**.

The project consists of two connected surfaces living in this repository:
1. **Private Dashboard (`apps/dashboard`)**: The daily operating system for tracking learning, goals, skills, roadmap milestones, experiment logs, and staging drafts.
2. **Public Website (`apps/website`)**: An editorial, minimalist public showcase presenting published journals, experiments, projects, research, and evolving spatial design principles.

---

## 2. Why XR Lab Exists

XR Lab solves the friction between learning and proving capability:
- **Evidence-Driven Growth**: Every learning milestone produces tangible evidence (an experiment, prototype, or case study).
- **Single Source of Truth**: Log once, structure the record, manage it in the private dashboard, publish approved work, and version everything in Git.
- **Portability**: Content is maintained in standard Markdown/MDX frontmatter format rather than locked into a proprietary CMS database.

---

## 3. Product Principle

```text
Learn ──► Experiment ──► Build ──► Test ──► Reflect ──► Document ──► Publish ──► Showcase
```

---

## 4. Repository Structure

```text
xr-lab/
├── apps/
│   ├── dashboard/            # Private workspace & management system
│   └── website/              # Public showcase platform
│
├── packages/
│   ├── types/                # TypeScript interfaces & Zod schemas
│   ├── content/              # Markdown reader, validator & filter utilities
│   ├── ui/                   # Shared UI primitives & design tokens
│   └── config/               # Shared TS/Tailwind/ESLint configurations
│
├── content/                  # Git-tracked, portable Markdown/MDX
│   ├── journal/              # Chronological learning reflections
│   ├── experiments/          # Isolated question/hypothesis investigations
│   ├── projects/             # Deep-dive spatial case studies
│   ├── research/             # Spatial design & ergonomics investigations
│   ├── principles/           # Evolving design philosophies
│   └── knowledge/            # Personal XR encyclopedia
│
├── data/                     # Structured JSON / local state
│   ├── roadmap/              # Stage & milestone definitions
│   ├── skills/               # Capability evaluation matrices
│   └── settings/             # Workspace preferences
│
├── public/                   # Media & static assets (images, videos)
├── docs/                     # Specifications & Architecture Documentation
│   ├── XR-LAB-MASTER-SPEC.md # Master Product Specification
│   ├── ARCHITECTURE.md       # Technical Architecture Reference
│   └── CONTENT-MODEL.md      # Schema & Frontmatter Model
├── scripts/                  # Utilities & build helpers
├── package.json              # Monorepo root with npm workspaces
└── .gitignore
```

---

## 5. Technology Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content Engine**: Markdown / MDX + [Gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Validation**: [Zod](https://zod.dev/)
- **Version Control**: Git & GitHub
- **Deployment**: Vercel

---

## 6. Getting Started & Local Development

### Prerequisites
- Node.js `v20+` or `v22+`
- npm `v10+`

### Installation
```bash
npm install
```

### Running Locally
```bash
# Run both Dashboard and Website simultaneously
npm run dev

# Run Dashboard only (http://localhost:3000)
npm run dev:dashboard

# Run Website only (http://localhost:3001)
npm run dev:website
```

### Typechecking & Linting
```bash
# Run typechecks across all packages and apps
npm run typecheck

# Run linter
npm run lint
```

---

## 7. Content & Publishing Flow

1. **Create/Edit**: Entries are created in the Dashboard and stored with `status: "draft"` or `"working"`.
2. **Review**: Content is reviewed and staged (`status: "review"`).
3. **Publish**: When explicitly approved, the item is marked as `status: "published"`.
4. **Render**: The public website automatically queries only records with `status === "published"`.

---

## 8. Git Workflow

- `main`: Production-ready releases and published content.
- `development`: Active integration branch.
- Feature branches: `feature/<feature-name>`.

---

## 9. Documentation Index

- 📘 [XR Lab Master Specification](./docs/XR-LAB-MASTER-SPEC.md)
- 🏗️ [Technical Architecture](./docs/ARCHITECTURE.md)
- 📋 [Content Model & Schemas](./docs/CONTENT-MODEL.md)
