# XR Lab — Master Project Context & Build Specification

> **Purpose:** This document is the single source of truth for building, maintaining, and extending XR Lab.
>
> **IMPORTANT FOR ANTIGRAVITY:** Read this document before taking any action on the project. Do not make architectural, product, content-model, or workflow decisions that conflict with this document without first explaining the conflict and proposing an update to this specification.

---

# README — START HERE

## What is XR Lab?

XR Lab is a personal learning, experimentation, research, documentation, and publishing platform for a Product Designer transitioning into XR / Spatial Design.

The project has two connected surfaces:

1. **Private Dashboard** — the operating system for tracking learning, experiments, projects, research, skills, goals, progress, and publishing.
2. **Public Website** — a curated public record of the journey, showing published journal entries, experiments, projects, research, principles, and progress.

GitHub is the source-control and portability layer.

The core principle is:

> **Log once → structure the information → track it in the dashboard → publish approved work to the website → version everything in GitHub.**

The system should avoid duplicate manual entry.

---

## REQUIRED READING RULE

Before making changes, Antigravity must:

1. Read `/README.md`.
2. Read this master specification if it is stored separately from README.
3. Inspect the existing project structure.
4. Inspect relevant existing components, data models, routes, and content before changing them.
5. Preserve the existing architecture unless a change is explicitly requested or a clear technical problem requires it.
6. Explain any architectural change that could affect data, publishing, GitHub structure, or backward compatibility.
7. Never blindly rebuild an existing feature.
8. Prefer small, testable changes over large rewrites.

If the task conflicts with this document, stop and identify the conflict before implementation.

---

# 1. PRODUCT VISION

## Positioning

XR Lab should feel like:

- a personal XR research lab
- a living learning journal
- an experimentation archive
- a spatial design portfolio
- a public record of professional growth

It should NOT feel like:

- a generic task manager
- a generic Notion clone
- a static portfolio
- a course platform
- a social network
- a dashboard full of meaningless percentages

The product should communicate:

> **"I'm documenting my journey from Product Designer to Spatial Designer — what I learn, what I build, what fails, and how my thinking evolves."**

---

# 2. USER

The primary user is the creator of XR Lab.

The system should support a Product Designer who already has a strong foundation in:

- UI/UX
- Product Design
- UX research
- Information Architecture
- Interaction Design
- Design systems
- Prototyping
- Fintech product design
- Teaching/mentoring

The learning path should therefore prioritize translating existing product-design skills into XR rather than relearning basic design.

---

# 3. LEARNING STRATEGY

The target progression is:

**Product Designer**
→ **Spatial UX**
→ **XR Interaction Design**
→ **XR Prototyping**
→ **Spatial Product Design**

The learning path is approximately 16 weeks initially, but the platform must support an indefinite journey.

## Learning stages

### Stage 01 — XR Foundations
Understand:

- VR
- AR
- MR
- spatial computing
- 3DoF / 6DoF
- head tracking
- eye tracking
- hand tracking
- passthrough
- spatial anchors
- field of view
- presence
- immersion
- comfort
- accessibility
- spatial cognition

### Stage 02 — Spatial UX
Focus on:

- spatial hierarchy
- depth
- distance
- scale
- orientation
- spatial navigation
- spatial grouping
- environmental UI
- contextual UI
- world-locked UI
- head-locked UI
- object-attached UI
- spatial menus
- radial menus
- affordances in 3D

### Stage 03 — XR Interaction & Prototyping
Focus on:

- gaze
- hand gestures
- controllers
- pinch
- grab
- drag
- pointing
- voice
- eye + hand combinations
- interaction design
- usability
- prototyping

### Stage 04 — 3D + Development
Focus on:

- Blender basics
- 3D modeling
- materials
- lighting
- Unity
- scenes
- GameObjects
- components
- prefabs
- cameras
- physics
- colliders
- animation
- basic C#
- XR Interaction Toolkit
- hand/controller interactions
- locomotion

The user does NOT need to become a professional 3D artist or Unity engineer.

### Stage 05 — Real XR Product Design
Build meaningful products such as:

- spatial banking
- immersive education
- VR museum
- spatial productivity workspace
- XR storytelling/game experiences

The core question is always:

> **Why does this need to be XR?**

---

# 4. CORE LEARNING LOOP

Every meaningful learning activity should follow:

**LEARN**
→ **EXPERIMENT**
→ **BUILD**
→ **TEST**
→ **REFLECT**
→ **DOCUMENT**
→ **SHARE**
→ **LEARN AGAIN**

Avoid tutorial-only progress.

Use the rule:

> **Every major learning topic should produce evidence.**

Examples:

- Learn spatial navigation → design a spatial navigation system.
- Learn hand interaction → prototype a grab/pinch interaction.
- Learn environmental UI → design an environmental interface.
- Learn spatial audio → create an audio experiment.

---

# 5. PRODUCT ARCHITECTURE

The overall system:

```text
                         XR LAB
                           |
             +-------------+-------------+
             |                           |
       PRIVATE SIDE                 PUBLIC SIDE
             |                           |
        XR Dashboard                 XR Website
             |                           |
             +-------------+-------------+
                           |
                    Shared Content
                       System
                           |
                    +------+------+
                    |             |
                  Data          Assets
                    |             |
                 Markdown      Images/Video
                 JSON/DB
                    |             |
                    +------+------+
                           |
                         GitHub
```

The dashboard is the workspace.

The website is the publication layer.

GitHub is the version-control and portability layer.

---

# 6. INFORMATION ARCHITECTURE — DASHBOARD

Primary navigation:

```text
XR LAB
|
├── Overview
├── Roadmap
├── Learning
├── Experiments
├── Projects
├── Journal
├── Research
├── Knowledge
├── Principles
├── Resources
├── Skills
├── Goals
├── Progress
├── Publications
├── Assets
└── Settings
```

---

# 7. DASHBOARD — OVERVIEW

The Overview is the command center.

It should show:

## Current Focus
What the user is learning now.

## Current Stage
The active learning stage.

## Current Goal
The current measurable objective.

## Current Project
The active project.

## Current Experiment
The active experiment.

## Current Question
The main question being explored.

## Progress
Progress by learning stage and skill.

## This Week
Examples:

- learning sessions
- experiments
- journal entries
- projects
- published items

## Latest Activity
Chronological activity feed.

## Next Milestone
The next important achievement.

Avoid overusing metrics. Numbers should help decision-making.

---

# 8. ROADMAP

The roadmap is capability-driven rather than merely date-driven.

Each stage should contain:

- objectives
- topics
- skills
- lessons
- exercises
- experiments
- projects
- completion criteria
- resources
- evidence

Recommended statuses:

- Not Started
- Learning
- Practicing
- Understood
- Mastered

A topic is not considered mastered merely because it was checked off.

---

# 9. LEARNING ENTITY

Learning records answer:

> **What am I learning?**

Suggested fields:

- id
- title
- description
- stage
- topic
- skill
- dateStarted
- dateCompleted
- status
- difficulty
- confidence
- resources
- notes
- relatedExperiments
- relatedProjects
- published
- createdAt
- updatedAt

Confidence should support a simple scale such as 1–5.

---

# 10. EXPERIMENT ENTITY

Experiments are small investigations.

Each experiment should capture:

- id
- title
- question
- hypothesis
- approach
- process
- tools
- stage
- skills
- result
- whatWorked
- whatFailed
- whatWasLearned
- nextIteration
- images
- videos
- prototypeLinks
- githubLinks
- status
- publicationId
- createdAt
- updatedAt

The experiment model should encourage:

**Question → Hypothesis → Experiment → Result → Reflection**

---

# 11. PROJECT ENTITY

Projects are larger pieces of work.

Suggested structure:

- id
- title
- slug
- summary
- status
- problem
- research
- users
- opportunity
- concept
- spatialUX
- interaction
- visualDesign
- prototype
- testing
- iterations
- outcome
- reflection
- tools
- skills
- images
- videos
- links
- githubLinks
- publicationId
- createdAt
- updatedAt

A project can reference multiple:

- learning records
- experiments
- research records
- principles

---

# 12. JOURNAL ENTITY

The Journal is the chronological record of the journey.

Suggested fields:

- id
- title
- slug
- date
- status
- summary
- whatIWorkedOn
- whatILearned
- whatSurprisedMe
- challenges
- failures
- whatChangedInMyThinking
- nextSteps
- evidence
- relatedLearning
- relatedExperiments
- relatedProjects
- tags
- coverImage
- publicationId
- createdAt
- updatedAt

Journal entries should preserve the user's authentic voice.

AI may help structure or polish a publication, but should not erase the original raw reflection.

---

# 13. RESEARCH ENTITY

Research is different from general learning.

Research asks a question and attempts to investigate it.

Suggested fields:

- id
- title
- question
- hypothesis
- context
- sources
- observations
- findings
- conclusion
- openQuestions
- relatedExperiments
- relatedProjects
- relatedPrinciples
- tags
- status
- publicationId
- createdAt
- updatedAt

---

# 14. KNOWLEDGE ENTITY

The Knowledge Library is a personal XR encyclopedia.

Examples:

- Spatial Anchors
- Presence
- 6DoF
- Hand Tracking
- Eye Tracking
- Spatial Navigation
- Environmental UI

Suggested fields:

- id
- title
- definition
- simpleExplanation
- whyItMatters
- examples
- sources
- relatedConcepts
- relatedExperiments
- relatedProjects
- confidence
- tags
- createdAt
- updatedAt

---

# 15. PRINCIPLES ENTITY

Principles represent the user's evolving design philosophy.

Suggested fields:

- id
- title
- statement
- whyIBelieveThis
- evidence
- relatedExperiments
- relatedProjects
- examples
- confidence
- createdAt
- updatedAt

Example:

> **Don't put a 2D interface into 3D without a reason.**

Principles should be connected to evidence.

---

# 16. SKILLS ENTITY

Skills should measure capability, not only completion.

Suggested fields:

- id
- name
- category
- knowledgeLevel
- applicationLevel
- teachingLevel
- targetLevel
- confidence
- lastPracticed
- evidence
- relatedLearning
- relatedExperiments
- relatedProjects

Suggested levels:

1. Heard of it
2. Understand basics
3. Can use it
4. Can solve problems with it
5. Can teach it

Categories:

- XR
- Spatial UX
- Interaction
- 3D
- Development
- Research
- Product Design

---

# 17. GOALS

Goals should support:

- long-term goals
- stage goals
- monthly goals
- weekly goals
- project goals

Each goal should have:

- title
- description
- type
- status
- targetDate
- measurableOutcome
- relatedStage
- relatedSkills
- relatedProjects
- progress

---

# 18. PROGRESS

Progress should be derived from evidence where possible.

Avoid fake precision.

For example:

```text
XR Foundations       100%
Spatial UX             70%
XR Interaction         35%
3D Design              30%
Unity                  20%
XR Research            40%
```

The system should eventually be able to explain why a percentage exists.

A better model is:

**progress = completed capability evidence / planned capability evidence**

rather than arbitrary task counts.

---

# 19. RESOURCES

Resources include:

- articles
- papers
- books
- courses
- videos
- documentation
- talks
- people
- communities
- tools

Suggested fields:

- title
- type
- url
- author
- source
- description
- tags
- status
- notes
- rating
- relatedTopics
- createdAt

---

# 20. ASSETS

Assets include:

- images
- screenshots
- videos
- prototype captures
- 3D assets
- documents

Assets should have:

- id
- filename
- type
- path
- altText
- caption
- relatedEntity
- relatedEntityId
- createdAt

Do not put huge binary files directly into ordinary Git history unnecessarily.

Consider Git LFS or external storage for large videos later.

---

# 21. PUBLIC WEBSITE INFORMATION ARCHITECTURE

Public navigation should remain simple:

```text
XR LAB
|
├── Home
├── Journey
├── Experiments
├── Projects
├── Journal
├── Research
├── Principles
└── About
```

The public site should NOT expose private dashboard data by default.

Only published records should appear publicly.

---

# 22. PUBLIC HOME PAGE

The home page should communicate the story immediately.

Suggested content:

## Hero

**XR Lab**

> Exploring what happens when product design leaves the screen.

## Current Status

- current stage
- current focus
- current project
- current experiment
- current question

## Journey Progress

A visual journey timeline.

## Featured Experiment

A recent interesting experiment.

## Featured Project

A serious portfolio project.

## Latest Journal

Recent published entries.

## Principles

A few evolving design principles.

## About

Why the journey exists.

---

# 23. JOURNEY PAGE

Chronological timeline:

```text
2026

AUG
Started XR exploration
|
Spatial UX
|
First spatial interface
|
SEP
First Blender experiment
|
OCT
First Unity prototype
|
...
```

Each milestone should link to published evidence.

---

# 24. EXPERIMENTS PAGE

Visual grid of experiments.

Each card should show:

- title
- question
- stage
- skills
- tool
- status
- cover
- date

Filters:

- stage
- skill
- tool
- status
- year

---

# 25. PROJECTS PAGE

Projects should be the most portfolio-oriented area.

Each project should support a full case study.

Case-study structure:

**Context**
→ **Problem**
→ **Research**
→ **Opportunity**
→ **Concept**
→ **Spatial UX**
→ **Interaction**
→ **Prototype**
→ **Testing**
→ **Iteration**
→ **Outcome**
→ **Reflection**

---

# 26. JOURNAL PAGE

The Journal is the public learning archive.

It should support:

- chronological browsing
- tags
- categories
- search
- featured entries

Publication types:

### NOTE
Small observation or learning.

### JOURNAL
Meaningful learning session or experiment.

### REPORT
Substantial investigation or research.

### CASE STUDY
Major project.

---

# 27. RESEARCH PAGE

Public research posts can include:

- research questions
- investigations
- findings
- experiments
- conclusions
- open questions

The public research layer should feel accessible, not academic for the sake of sounding academic.

---

# 28. PRINCIPLES PAGE

Show evolving principles.

Each principle should link to evidence.

Example:

> **Space should communicate meaning, not just provide decoration.**

Related evidence:

- Experiment #003
- Project #001
- Research #002

---

# 29. PUBLICATION SYSTEM

This is the bridge between dashboard and website.

Publication statuses:

```text
Draft
↓
Working
↓
Ready for Review
↓
Published
↓
Archived
```

Publishing should require an explicit user action.

Do not automatically publish private notes.

---

# 30. PUBLICATION TYPES

### Note
Short, lightweight observation.

### Journal
A meaningful learning/experiment entry.

### Report
A deeper investigation.

### Case Study
A complete project.

Every published record should have:

- title
- slug
- date
- type
- summary
- body
- tags
- cover
- related content
- status
- publishedAt
- SEO metadata

---

# 31. SINGLE SOURCE OF TRUTH

Never require the user to manually duplicate the same content between dashboard and website.

Preferred flow:

```text
Dashboard
    ↓
Structured record
    ↓
Review
    ↓
Publish
    ↓
Website
```

The dashboard is the content management interface.

The website consumes published content.

---

# 32. GIT-FRIENDLY CONTENT ARCHITECTURE

Start with one GitHub repository.

Recommended structure:

```text
xr-lab/
|
├── apps/
│   ├── dashboard/
│   └── website/
|
├── content/
│   ├── journal/
│   ├── experiments/
│   ├── projects/
│   ├── research/
│   ├── principles/
│   └── knowledge/
|
├── data/
│   ├── roadmap/
│   ├── skills/
│   └── settings/
|
├── public/
│   ├── images/
│   ├── videos/
│   └── assets/
|
├── scripts/
├── docs/
├── README.md
├── package.json
└── .gitignore
```

Use a monorepo initially.

---

# 33. MARKDOWN CONTENT

Published content should be portable.

Example:

```yaml
---
title: "Designing Spatial Navigation"
type: "journal"
date: "2026-08-22"
status: "published"
tags:
  - spatial-ux
  - navigation
  - interaction
experiment: "exp-003"
featured: true
---
```

Then the website renders the Markdown/MDX content.

Do not trap the user's long-form content inside a proprietary database.

---

# 34. CONTENT FILE EXAMPLES

Journal:

```text
content/journal/2026-08-22-designing-spatial-navigation.md
```

Experiment:

```text
content/experiments/exp-003-spatial-navigation.md
```

Project:

```text
content/projects/spatial-banking.md
```

Research:

```text
content/research/spatial-navigation.md
```

Principle:

```text
content/principles/space-should-communicate.md
```

---

# 35. TECHNICAL STACK

Recommended initial stack:

## Frontend
Next.js + TypeScript

## Styling
Tailwind CSS

## Content
Markdown / MDX

## Validation
Zod

## Database
Start simple. SQLite can work locally for structured dashboard state.

When cloud persistence/auth/sync is required, move to Supabase/Postgres.

## Version control
GitHub

## Deployment
Vercel or equivalent Next.js-compatible hosting

The architecture should keep the content layer portable even if the database or hosting changes.

---

# 36. DO NOT OVERENGINEER V1

V1 should not begin with:

- complex authentication
- complicated cloud architecture
- AI everywhere
- real-time collaboration
- microservices
- multiple databases
- advanced analytics
- elaborate Git automation

First prove:

> **Can I learn, log, publish, and view the journey?**

---

# 37. DEVELOPMENT PHASES

## Phase 01 — Foundation

Build:

- GitHub repository
- project structure
- Next.js
- TypeScript
- Tailwind
- development environment
- README
- architecture docs

Acceptance criteria:

- project runs locally
- repository is clean
- README explains the project
- dashboard and website apps are structurally separated

---

## Phase 02 — Dashboard

Build:

- Overview
- Roadmap
- Learning
- Skills
- Goals
- Progress

Acceptance criteria:

- user can add learning records
- user can track skills
- user can see current stage
- progress is visible
- dashboard is useful without the public website

---

## Phase 03 — Documentation System

Build:

- Journal
- Experiments
- Projects
- Research
- Knowledge
- Principles
- Resources

Acceptance criteria:

- records can be created
- records can reference one another
- evidence can be attached
- records have clear statuses

---

## Phase 04 — Publishing

Build:

- publication states
- draft/review/published
- slugs
- metadata
- public/private handling
- Markdown/MDX generation

Acceptance criteria:

- a dashboard record can be prepared for publishing
- publishing creates/updates public content
- unpublished records remain private

---

## Phase 05 — Website

Build:

- Home
- Journey
- Experiments
- Projects
- Journal
- Research
- Principles
- About

Acceptance criteria:

- public site consumes published content
- content is searchable/filterable where useful
- each item has a stable URL
- related content is discoverable

---

## Phase 06 — GitHub Integration

Build:

- versioned content
- safe commit/push workflow
- content synchronization
- branch workflow
- deployment integration

Acceptance criteria:

- content changes can be versioned
- changes are recoverable
- website can deploy from GitHub
- no important content exists only in a local untracked state

---

## Phase 07 — Automation

Potential additions:

- automatic article formatting
- image optimization
- sitemap
- RSS
- social metadata
- search
- analytics
- monthly reports
- content summaries

---

## Phase 08 — AI Layer

Only after the core system is stable.

AI can help with:

- converting raw notes into draft articles
- identifying recurring themes
- suggesting next learning topics
- identifying skill gaps
- generating social post drafts
- generating monthly reports
- preparing portfolio case-study drafts
- summarizing the journey

AI must remain assistive.

The user's actual learning record remains the source of truth.

---

# 38. WEEKLY LEARNING SYSTEM

Suggested weekly routine:

### Monday
Learn — approximately 1.5 hours.

### Tuesday
Analyze — approximately 1 hour.

### Wednesday
Design — approximately 2 hours.

### Thursday
Build — approximately 2 hours.

### Weekend
Project — approximately 2–3 hours.

Weekly reflection:

1. What did I learn?
2. What did I build?
3. What challenged me?
4. What changed in my thinking?
5. What am I exploring next?

Keep documentation lightweight.

---

# 39. MONTHLY RETROSPECTIVE

Each month record:

- what I learned
- what I built
- what I struggled with
- what changed in my thinking
- strongest skill
- weakest skill
- most interesting experiment
- next focus

These retrospectives should eventually feed longer articles such as:

- My First 30 Days Learning XR
- 90 Days of Exploring Spatial Design
- 6 Months From Product Designer to Spatial Designer

---

# 40. CONTENT STRATEGY

The journey should produce multiple content levels.

## Level 1 — Raw
Private notes.

## Level 2 — Notes
Small public observations.

## Level 3 — Journal
Meaningful learning entries.

## Level 4 — Experiments
Visual documented investigations.

## Level 5 — Reports
Deep research.

## Level 6 — Case Studies
Major portfolio projects.

The same learning activity can eventually produce:

- personal record
- website entry
- portfolio evidence
- LinkedIn content
- teaching material
- future long-form article

---

# 41. "THINGS I GOT WRONG"

Create a dedicated archive for failed experiments.

Each entry:

- what I tried
- why I thought it would work
- what happened
- why it failed
- what I changed
- what I learned

Failures should not be hidden.

They are evidence of design thinking.

---

# 42. XR PLAYGROUND

Maintain a low-pressure area for experiments without portfolio expectations.

Examples:

- weird menus
- gesture experiments
- navigation experiments
- spatial notifications
- voice interaction
- gaze interaction
- object manipulation

Purpose:

> Explore without needing everything to become a polished case study.

---

# 43. XR RADAR

Track what deserves attention.

Example:

| Area | Importance | Current Level | Priority |
|---|---:|---:|---|
| Spatial UX | 5/5 | Beginner | Now |
| XR Interaction | 5/5 | Beginner | Now |
| XR Research | 5/5 | Beginner | Now |
| 3D Design | 4/5 | Beginner | Soon |
| Unity | 4/5 | Beginner | Soon |
| Blender | 3/5 | Beginner | Soon |
| C# | 2/5 | Beginner | Later |
| Shaders | 1/5 | Beginner | Later |

This prevents scope creep.

---

# 44. QUESTIONS I'M EXPLORING

Maintain a question database.

Examples:

- When should an interface exist in 3D?
- When is a 2D panel better than a spatial interface?
- How does eye tracking change navigation?
- How much movement is comfortable?
- How do people discover affordances in VR?
- How should error states work in XR?
- How does accessibility change in spatial computing?
- What makes an XR interaction feel natural?

Questions should link to research, experiments, and principles.

---

# 45. CAREER / OPPORTUNITY LAYER

Eventually track:

- XR jobs
- freelance opportunities
- internships
- hackathons
- competitions
- conferences
- communities
- collaborations
- open-source projects

The system should eventually connect learning to career development.

---

# 46. HARDWARE LAB

Track devices and interaction capabilities.

For each device:

- display
- tracking
- interaction methods
- strengths
- limitations
- comfort
- accessibility considerations
- design opportunities
- observations

Do not allow hardware exploration to distract from design fundamentals.

---

# 47. PUBLICATION QUALITY RULES

Before publishing, ask:

### Does this teach something?
### Does this show evidence?
### Does this show thinking?
### Does this show what changed?
### Is the user's voice still present?
### Is there something visual where useful?
### Can someone understand it without seeing the dashboard?

If not, keep it private or revise it.

---

# 48. GITHUB WORKFLOW

Keep the Git workflow simple.

Suggested branches:

```text
main
development

feature/dashboard
feature/journal
feature/website
feature/publishing
```

Basic loop:

```text
Pull
↓
Work
↓
Test
↓
Commit
↓
Push
↓
Pull Request
↓
Merge
```

For solo development, do not create unnecessary process.

---

# 49. DEVELOPMENT SAFETY RULES

Antigravity should:

- inspect before modifying
- make small changes
- avoid destructive migrations
- avoid deleting user content without confirmation
- preserve existing routes
- preserve existing content
- validate data
- test after significant changes
- keep secrets out of Git
- update documentation when architecture changes
- use meaningful commit messages

Never commit:

- API keys
- passwords
- tokens
- private credentials
- local secrets

Use `.env.example` for required environment variables.

---

# 50. DESIGN DIRECTION

The product should feel like a **modern research lab**, not an enterprise admin dashboard.

Desired characteristics:

- editorial
- calm
- experimental
- technical
- spatial
- visual
- minimal
- highly readable
- strong typography
- excellent media presentation

The dashboard can be information-dense.

The public website should be more editorial and immersive.

Do not use excessive gradients, glassmorphism, animations, or decorative 3D effects without purpose.

The public website itself may eventually demonstrate spatial-design thinking through subtle interaction, depth, motion, and possibly WebXR.

---

# 51. WEBSITE PRINCIPLE

The website should demonstrate spatial thinking without becoming a gimmick.

The portfolio is about XR.

Therefore, subtle examples of:

- depth
- spatial relationships
- motion
- hover behavior
- cursor interaction
- layered content
- interactive prototypes

can be explored.

But accessibility, readability, performance, and usability always come first.

---

# 52. DASHBOARD VS WEBSITE

## Dashboard

Private.

Purpose:

- track
- manage
- plan
- research
- write
- organize
- review
- publish

## Website

Public.

Purpose:

- showcase
- explain
- teach
- document
- demonstrate growth
- share research
- present portfolio work

Never expose private dashboard information merely because it exists in the same system.

---

# 53. LONG-TERM VISION

The platform should eventually become:

**XR portfolio**
+
**research lab**
+
**learning journal**
+
**knowledge base**
+
**content engine**
+
**career archive**

The end result should make it possible to answer:

> "What have you done in XR?"

with a URL.

And that URL should tell the entire story.

---

# 54. SUCCESS CRITERIA

XR Lab is successful when:

1. The user can track their XR learning.
2. The user can document experiments.
3. The user can build and document projects.
4. The user can preserve raw reflections.
5. The user can publish selected work.
6. The website automatically reflects published content.
7. Content is version-controlled in GitHub.
8. The system remains portable.
9. The user can see skill gaps.
10. The user can show the journey publicly.
11. The system reduces duplicate work.
12. The platform itself demonstrates strong product/design thinking.

---

# 55. RECOMMENDED BUILD ORDER

Do not start by building everything.

Build in this exact order:

```text
1. Repository + README
2. Project architecture
3. Design system
4. Dashboard shell
5. Roadmap
6. Learning
7. Skills
8. Journal
9. Experiments
10. Projects
11. Publication model
12. Website shell
13. Website content rendering
14. Publish workflow
15. GitHub synchronization
16. Search/filtering
17. Automation
18. AI features
```

The first usable milestone should be:

> **I can log what I learned today and see it reflected in my dashboard.**

The second:

> **I can turn that log into a publishable journal entry.**

The third:

> **I can publish it and see it on the website.**

The fourth:

> **The content is safely versioned in GitHub.**

Only after these work should advanced features be added.

---

# 56. ANTIGRAVITY WORKING PRINCIPLE

Before implementing any feature, answer:

### What problem does this solve?

### Which entity does it affect?

### Is this private or public?

### Does it change the content model?

### Does it affect the website?

### Does it affect GitHub/version control?

### Does it require migration?

### How will it be tested?

If those questions cannot be answered, do not immediately implement.

---

# 57. FIRST TASK FOR ANTIGRAVITY

The first implementation task should NOT be "build the dashboard."

It should be:

> **Analyze this specification, inspect the repository, propose the technical architecture and implementation plan, and wait for approval before making major changes.**

The proposal should include:

- current repository state
- proposed folder structure
- frontend architecture
- content architecture
- data model
- dashboard architecture
- website architecture
- publishing architecture
- GitHub workflow
- deployment approach
- risks
- open questions
- Phase 1 implementation plan

Only after review should major implementation begin.

---

# 58. IMPORTANT PRODUCT PHILOSOPHY

Do not optimize for:

> "How many features can we build?"

Optimize for:

> **"How easily can I learn, document, publish, and show my growth?"**

The product should remove friction between:

**Learning → Evidence → Reflection → Publication → Portfolio**

That is the central purpose of XR Lab.

---

# 59. FUTURE POSSIBILITIES

These are deliberately future ideas, not V1 requirements:

- AI research assistant
- automatic content summaries
- monthly progress reports
- learning recommendations
- skill-gap detection
- public RSS
- newsletter
- social sharing
- WebXR portfolio interactions
- interactive 3D timeline
- public API
- community contributions
- teaching resources
- downloadable learning reports
- annual XR journey report

Do not implement these until the core system is stable.

---

# 60. FINAL CONTEXT

XR Lab is not simply a tracker.

It is a system for documenting a professional transformation:

> **Product Designer → Spatial Designer**

The most important output is not the dashboard.

The most important output is the **evidence of growth**.

Every feature should ultimately support that goal.

---

# END OF MASTER SPECIFICATION

Antigravity: **read this document before acting on the XR Lab project.**
