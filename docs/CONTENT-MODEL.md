# XR Lab — Content Model & Schema Reference

This document defines the schema, frontmatter fields, and entity relationships across XR Lab.

---

## 1. Domain Entities

### 1.1 Journal (`/content/journal/`)
Chronological record of daily/weekly reflections and learning progression.

```yaml
---
id: "jrn-20260822-01"
title: "Designing Spatial Navigation for 6DoF Interfaces"
slug: "designing-spatial-navigation-6dof"
date: "2026-08-22"
type: "journal" # note | journal | report | case-study
status: "published" # draft | working | review | published | archived
summary: "Exploring egocentric vs exocentric coordinates in spatial UI layout."
stage: "02-spatial-ux"
tags:
  - spatial-ux
  - navigation
  - 6dof
skills:
  - "spatial-navigation"
  - "spatial-hierarchy"
relatedExperiments:
  - "exp-003"
relatedProjects: []
coverImage: "/images/journal/spatial-nav-cover.png"
featured: true
publishedAt: "2026-08-22T12:00:00Z"
---
```

---

### 1.2 Experiment (`/content/experiments/`)
Focused investigations testing a specific question or hypothesis.

```yaml
---
id: "exp-003"
title: "World-Locked vs Head-Locked Menu Accessibility"
slug: "world-locked-vs-head-locked-menus"
date: "2026-08-24"
status: "published"
stage: "02-spatial-ux"
question: "How does menu retention behave during rapid head rotation?"
hypothesis: "World-locked menus reduce motion sickness but increase cognitive search time."
skills:
  - "spatial-ux"
  - "interaction-design"
tools:
  - "Unity"
  - "XR Interaction Toolkit"
result: "World-locked with lazy-follow damping yielded the best comfort score."
whatWorked: "300ms smoothing delay on orientation follow."
whatFailed: "Strict head-locking caused visual fatigue in 80% of test passes."
whatWasLearned: "Hybrid follow models outperform static world-locking."
images:
  - "/images/experiments/exp-003-fig1.png"
videos: []
prototypeLinks: []
githubLinks: []
coverImage: "/images/experiments/exp-003-cover.png"
publishedAt: "2026-08-24T15:00:00Z"
---
```

---

### 1.3 Project (`/content/projects/`)
Comprehensive case studies and spatial products.

```yaml
---
id: "prj-001"
title: "Spatial Banking & Financial Telemetry"
slug: "spatial-banking"
date: "2026-09-15"
status: "published"
summary: "A spatial computing interface for multi-asset portfolio visualization."
problem: "Complex multi-portfolio correlation analysis is constrained by 2D screen real estate."
concept: "3D topographical asset landscape with contextual gesture manipulation."
stage: "05-real-xr-products"
skills:
  - "spatial-ux"
  - "prototyping"
  - "unity"
tools:
  - "Figma"
  - "Blender"
  - "Unity"
coverImage: "/images/projects/spatial-banking-cover.png"
images:
  - "/images/projects/spatial-banking-screens.png"
featured: true
publishedAt: "2026-09-15T18:00:00Z"
---
```

---

### 1.4 Research (`/content/research/`)
Deep-dive investigations into foundational spatial computing topics.

```yaml
---
id: "res-001"
title: "Ergonomics of Arm Fatigue (Gorilla Arm) in Spatial UI"
slug: "ergonomics-arm-fatigue-spatial-ui"
date: "2026-08-20"
status: "published"
question: "What is the optimal interaction envelope for sustained mid-air gestures?"
findings: "Micro-gestures at waist/rest level with eye-gaze targeting reduce fatigue by 70%."
conclusion: "Prefer indirect manipulation over direct physical reach for frequent actions."
tags:
  - ergonomics
  - interaction
  - eye-tracking
relatedPrinciples:
  - "prin-002"
publishedAt: "2026-08-20T10:00:00Z"
---
```

---

### 1.5 Principle (`/content/principles/`)
Core design convictions grounded in experiment evidence.

```yaml
---
id: "prin-001"
title: "Don't put a 2D interface into 3D without a reason"
slug: "space-must-have-purpose"
statement: "Physical volume carries cognitive weight. If depth does not aid comprehension or interaction, flat canvas remains superior."
evidence:
  - "exp-001"
  - "exp-003"
confidence: 5 # Scale 1 to 5
publishedAt: "2026-08-25T00:00:00Z"
---
```

---

### 1.6 Knowledge (`/content/knowledge/`)
Personal spatial computing encyclopedia.

```yaml
---
id: "kno-001"
title: "6DoF (Six Degrees of Freedom)"
slug: "6dof"
definition: "Freedom of movement of a rigid body in three-dimensional space: forward/backward, up/down, left/right (translation), combined with yaw, pitch, roll (rotation)."
simpleExplanation: "You can move around in the room and look in any direction, and the virtual world responds accurately."
whyItMatters: "Enables true physical presence and room-scale spatial interaction."
confidence: 5
tags:
  - fundamentals
  - tracking
---
```

---

## 2. Publication Status States

```text
Draft (Private) 
  └─► Working (Private) 
        └─► Review (Staging) 
              └─► Published (Public on Website) 
                    └─► Archived (Hidden/Historical)
```
